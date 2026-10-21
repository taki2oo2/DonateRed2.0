import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/moongoose";
import { User } from "@/database/user.model";
import logger from "@/lib/logger";
import handleError from "@/lib/errHandler";
import { UserValidationSchema } from "@/lib/validations";
import { ValidationError } from "@/lib/errors";

export async function POST(req: NextRequest): Promise<APIResponse> {
    try {
        const tStart = performance.now();
        const evt = await verifyWebhook(req);
        const tVerified = performance.now();
        logger.info(`[Perf] Clerk Webhook signature verification took ${(tVerified - tStart).toFixed(2)}ms`);
        logger.info(`Clerk Webhook event received: type=${evt.type}`);

        if (evt.type === "user.created") {
            const user = evt.data;
            
            // Map Clerk payload to match the database schema and validation schema
            const clerkid = user.id;
            const email = user.email_addresses?.[0]?.email_address;
            const firstName = user.first_name;
            const lastName = user.last_name;
            const fullname = `${firstName} ${lastName}`.trim();
            // Extract private metadata fields securely if they exist (otherwise undefined)
            const contactno = (user.private_metadata?.contactnumber as string) || undefined;
            const city = (user.private_metadata?.city as string) || undefined;

            const userToValidate = {
                clerkid,
                fullname,
                email,
                contactno,
                city,
                isDonar: false,
            };

            const validatedData = UserValidationSchema.safeParse(userToValidate);
            if (!validatedData.success) {
                logger.warn({ errors: validatedData.error.flatten().fieldErrors }, `Clerk Webhook validation failed for ${evt.type}: clerkid=${clerkid}`);
                throw new ValidationError(validatedData.error.flatten().fieldErrors)
            }
            const tValidated = performance.now();
            logger.info(`[Perf] Mapping & Zod validation took ${(tValidated - tVerified).toFixed(2)}ms`);

            const tDbConnectStart = performance.now();
            await dbConnect();
            const tDbConnectEnd = performance.now();
            logger.info(`[Perf] dbConnect took ${(tDbConnectEnd - tDbConnectStart).toFixed(2)}ms`);

            const tMongooseStart = performance.now();
            const newUser = await User.findOneAndUpdate(
                {
                    clerkid: validatedData.data.clerkid
                },
                validatedData.data,
                {
                    upsert: true,
                    returnDocument: "after",
                    setDefaultsOnInsert: true,
                }
            );
            const tMongooseEnd = performance.now();
            logger.info(`[Perf] User findOneAndUpdate took ${(tMongooseEnd - tMongooseStart).toFixed(2)}ms`);
            logger.info(`Successfully synced ${evt.type} webhook to MongoDB: clerkid=${validatedData.data.clerkid}`);

            const res = { success: true, data: newUser, status: 201 }
            return NextResponse.json(res, { status: 201 }) as APISuccessResponse<typeof res>
        }

        if (evt.type === "user.updated") {
            const user = evt.data;
            const clerkid = user.id;

            // Build an update payload from the fields Clerk can change
            const email = user.email_addresses?.[0]?.email_address;
            const firstName = user.first_name;
            const lastName = user.last_name;
            const fullname = `${firstName} ${lastName}`.trim();
            const contactno = (user.private_metadata?.contactnumber as string) || undefined;
            const city = (user.private_metadata?.city as string) || undefined;

            const updatePayload: Record<string, unknown> = {
                fullname,
                email,
                ...(contactno !== undefined && { contactno }),
                ...(city !== undefined && { city }),
            };

            // Validate only the updatable fields using a partial schema
            const UpdateSchema = UserValidationSchema.pick({
                fullname: true,
                email: true,
                contactno: true,
                city: true,
            });

            const validatedData = UpdateSchema.safeParse(updatePayload);
            if (!validatedData.success) {
                logger.warn({ errors: validatedData.error.flatten().fieldErrors }, `Clerk Webhook validation failed for ${evt.type}: clerkid=${clerkid}`);
                throw new ValidationError(validatedData.error.flatten().fieldErrors);
            }
            const tValidated = performance.now();
            logger.info(`[Perf] Mapping & Zod validation took ${(tValidated - tVerified).toFixed(2)}ms`);

            const tDbConnectStart = performance.now();
            await dbConnect();
            const tDbConnectEnd = performance.now();
            logger.info(`[Perf] dbConnect took ${(tDbConnectEnd - tDbConnectStart).toFixed(2)}ms`);

            const tMongooseStart = performance.now();
            const updatedUser = await User.findOneAndUpdate(
                { clerkid },
                { $set: validatedData.data },
                { returnDocument: "after" }
            );
            const tMongooseEnd = performance.now();
            logger.info(`[Perf] User findOneAndUpdate took ${(tMongooseEnd - tMongooseStart).toFixed(2)}ms`);

            if (!updatedUser) {
                logger.warn(`user.updated webhook received but no user found in MongoDB: clerkid=${clerkid}`);
                return NextResponse.json({ success: false, message: "User not found" }, { status: 404 }) as APIErrorResponse;
            }

            logger.info(`Successfully synced ${evt.type} webhook to MongoDB: clerkid=${clerkid}`);
            const res = { success: true, data: updatedUser, status: 200 };
            return NextResponse.json(res, { status: 200 }) as APISuccessResponse<typeof res>;
        }

        if (evt.type === "user.deleted") {
            const clerkid = evt.data.id;

            const tDbConnectStart = performance.now();
            await dbConnect();
            const tDbConnectEnd = performance.now();
            logger.info(`[Perf] dbConnect took ${(tDbConnectEnd - tDbConnectStart).toFixed(2)}ms`);

            const tMongooseStart = performance.now();
            const result = await User.deleteOne({ clerkid });
            const tMongooseEnd = performance.now();
            logger.info(`[Perf] User deleteOne took ${(tMongooseEnd - tMongooseStart).toFixed(2)}ms`);

            if (result.deletedCount === 0) {
                logger.warn(`user.deleted webhook received but no user found in MongoDB: clerkid=${clerkid}`);
            } else {
                logger.info(`Successfully deleted user from MongoDB: clerkid=${clerkid}`);
            }

            // Always return 200 — deletion is idempotent
            const res = { success: true, message: `User ${clerkid} deleted`, status: 200 };
            return NextResponse.json(res, { status: 200 }) as APISuccessResponse<typeof res>;
        }

        // Return 200 for event types we don't handle to prevent Next.js from throwing a runtime error
        const unhandledRes = { success: true, message: `Event type ${evt.type} received` }
        return NextResponse.json(unhandledRes, { status: 200 }) as APISuccessResponse<typeof unhandledRes>

    } catch (error) {
        logger.error({ err: error }, "Error occurred processing Clerk Webhook");
        return handleError(error,"api") as APIErrorResponse
    }
}