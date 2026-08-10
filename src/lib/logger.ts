import pino from "pino";
const isEdge = process.env.NEXT_RUNTIME === "edge";
const isProduction = process.env.NODE_ENV === "production";

const logger = pino({
    // Sets the minimum importance of logs to show (default is "info").
    // Can be overridden via environment variables.
    level: process.env.LOG_LEVEL || "info",

    /**
     * TRANSPORT LOGIC (Visual Formatting)
     * !isEdge && !isProduction: Only use 'pino-pretty' if we are NOT on Edge AND NOT in Production.
     * Logic: Pino-pretty is a separate package that makes logs colorful. 
     * We don't use it in production because it's slower.
     */
    transport:
      !isEdge && !isProduction ? {
        target: "pino-pretty", // Use the pretty-print plugin
        options: {
            colorize: true,          // Add colors to terminal output
            ignore: "pid,hostname",  // Hide technical noise (Process ID and Hostname)
            translateTime: "SYS:standard" // Human-readable timestamps (e.g., 2024-05-20 14:00:00)
        }
      } : undefined, // If production/edge, output raw JSON for high performance

    /**
     * FORMATTERS
     * By default, Pino shows levels as numbers (e.g., 30).
     * This function changes it to uppercase strings (e.g., "INFO") in the output.
     */
    formatters: {
        level: (label) => ({ level: label.toLocaleUpperCase() }),
    },

    /**
     * TIMESTAMP
     * standard ISO format (e.g., 2024-05-20T12:00:00.000Z).
     */
    timestamp: pino.stdTimeFunctions.isoTime,
})

// Exporting so other files can use: logger.info("message") or logger.error(err)
export default logger;