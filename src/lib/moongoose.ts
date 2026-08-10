import mongoose, { Mongoose } from "mongoose";

import logger from "./logger";


const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MongoDB_URI is not defined");
}

interface MongooseCacahe {
  // `conn` holds the fully connected Mongoose instance.
  // Once mongoose.connect() resolves, we store it here.
  // If this is NOT null, we can instantly return it.
  conn: Mongoose | null;

  // `promise` holds the Promise returned by mongoose.connect()
  // while the connection is still being established.
  // This prevents multiple simultaneous connections.
  promise: Promise<Mongoose> | null;
}

declare global {
  // We use a `var` instead of `const` in the global declaration so that the
  // TypeScript compiler allows re-assignment during hot reloads in dev.
  var mongoose: MongooseCacahe;
}

let cached = global.mongoose


if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async (): Promise<Mongoose> => {
  // CASE A: If we already have a resolved connection in the cache, return it
  // immediately. This is the fastest path and happens on subsequent calls
  // after the initial connection is established.
  if (cached.conn) {
    // Explanation: `cached.conn` is the resolved Mongoose instance returned
    // by mongoose.connect. Returning it immediately avoids creating new
    // connections and is what makes this function idempotent.
    logger.info('Using old mongoose Connection');
    return cached.conn;
  }

  // CASE B: No resolved connection exists. Check if a connection attempt is
  // already in progress (cached.promise). If so, await that promise — this
  // prevents multiple concurrent calls from issuing multiple `mongoose.connect`
  // calls when many requests happen at the same time.
  if (!cached.promise) {
    // When there is no active connection attempt, create one and store the
    // promise in the cache. We call mongoose.connect with the URI and options
    // (here we pass the dbName explicitly so we always connect to the same DB
    // regardless of what's encoded in the URI).
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "DonateRed2.0",
      })
      .then((res) => {
        // This `then` runs when mongoose.connect resolves successfully.
        // We log for debugging/development to know a connection was made.
        logger.info("Connected to mongo Db ");
        return res; // resolve with the Mongoose instance
      })
      .catch((err) => {
        // If the connection attempt fails, we log the error and rethrow it.
        // Important: we do NOT swallow the error — callers that awaited the
        // promise will receive this rejection. Also note that we DON'T clear
        // cached.promise here; in practice you might want to set cached.promise
        // back to null so a future attempt can try again. Because this code
        // throws, the call to `await cached.promise` below will reject.
        logger.error("Error connecting to mongoDb", err);
        throw err;
      });
  }

  // At this point `cached.promise` is guaranteed to be non-null: either it was
  // set just above, or it already existed from another concurrent call. We
  // await it — this pauses until Mongoose connects (or the promise rejects).
  cached.conn = await cached.promise;

  // Now `cached.conn` holds the resolved Mongoose instance. Return it so the
  // caller gets the connected client and can use Mongoose models normally.
  return cached.conn;
};

// Export the helper as the default export so other modules can `import dbConnect`.
export default dbConnect;