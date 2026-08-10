import { ValidationError, ConflictError } from "@/lib/errors";
import dbConnect from "@/lib/moongoose";
import { User } from "@/database/user.model";
import logger from "@/lib/logger";

import { UserValidationSchema } from "@/lib/validations";
import { NextResponse } from "next/server";
import handleError from "@/lib/errHandler";

export async function POST(req:Request):APIResponse {
    try {
        const t0 = performance.now();
        await dbConnect();
        const t1 = performance.now();
        logger.info(`[Perf] dbConnect took ${(t1 - t0).toFixed(2)}ms`);

        const body = await req.json();
        const validatedData = UserValidationSchema.safeParse(body);
        if(!validatedData.success){
            throw new ValidationError(validatedData.error.flatten().fieldErrors)
        }
        const t2 = performance.now();
        logger.info(`[Perf] Body parsing & validation took ${(t2 - t1).toFixed(2)}ms`);

        try {
            const newUser = await User.create(validatedData.data);
            const t3 = performance.now();
            logger.info(`[Perf] User.create took ${(t3 - t2).toFixed(2)}ms`);

            const res = {success:true,data:newUser,status:201}
            return NextResponse.json(res, { status: 201 }) as APISuccessResponse<typeof res>
        } catch (error: any) {

            if (error.code === 11000) {
                throw new ConflictError("User already exists");
            }
            throw error;
        }
    } catch (error) {
        return handleError(error,"api") as APIErrorResponse
    }
}