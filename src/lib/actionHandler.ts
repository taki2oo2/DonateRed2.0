"use server"

import { ZodError, ZodSchema } from "zod"
import { UnauthorizedError, ValidationError } from "@/lib/errors";
import dbConnect from "./moongoose";
import { auth } from '@clerk/nextjs/server'
import { currentUser } from "@clerk/nextjs/server"

type ActionOptions<T> = {
    params: T
    schema: ZodSchema<T>
    authorize?: boolean;
    fullUser?: boolean;
}

export async function actionHandler<T>({ params, schema, authorize = false, fullUser = false }: ActionOptions<T>) {
    let validatedParams = params;
    if (schema && params) {
        try {
            validatedParams = schema.parse(params);
        } catch (error) {
            if (error instanceof ZodError) {
                throw new ValidationError(error.flatten().fieldErrors as Record<string, string[]>)
            } else {
                throw new Error("Zod schema validation failed")
            }
        }
    }

    let userId: string | null = null;
    if (authorize) {
        const authObj = await auth();
        if (!authObj.isAuthenticated) {
            throw new UnauthorizedError();
        }
        userId = authObj.userId;
    }

    let user: any = null;
    if (fullUser) {
        user = await currentUser();
    }

    await dbConnect()

    return {
        userId,
        user,
        validatedParams,
    };
}