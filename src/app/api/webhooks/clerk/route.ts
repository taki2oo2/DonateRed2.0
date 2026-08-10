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
            
            // Extract unsafe metadata fields passed from signup form
            const contactno = (user.unsafe_metadata?.contactnumber as string);
            const city = (user.unsafe_metadata?.city as string);

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
                logger.warn({ errors: validatedData.error.flatten().fieldErrors }, `Clerk Webhook validation failed for user.created: clerkid=${clerkid}`);
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
            logger.info(`Successfully synced user.created webhook to MongoDB: clerkid=${validatedData.data.clerkid}`);

            const res = {success:true,data:newUser,status:201}
            return NextResponse.json(res, { status: 201 }) as APISuccessResponse<typeof res>
        }

        // Return 200 for event types we don't handle to prevent Next.js from throwing a runtime error
        const unhandledRes = { success: true, message: `Event type ${evt.type} received` }
        return NextResponse.json(unhandledRes, { status: 200 }) as APISuccessResponse<typeof unhandledRes>

    } catch (error) {
        logger.error({ err: error }, "Error occurred processing Clerk Webhook");
        return handleError(error,"api") as APIErrorResponse
    }
}