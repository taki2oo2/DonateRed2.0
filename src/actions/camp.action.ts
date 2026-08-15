"use server"

import * as z from "zod"
import { Camp, ICamp } from "@/database/camp.model"
import { User } from "@/database/user.model"
import { PostCampFormSchema } from "@/lib/validations"
import { actionHandler } from "@/lib/actionHandler"
import handleError from "@/lib/errHandler"
import mongoose from "mongoose";
import cloudinary from "@/lib/cloudinary";

export type CreateCampParams = z.infer<typeof PostCampFormSchema>

export const createcamp = async (params: CreateCampParams): Promise<ActionResponse<ICamp>> => {
    try {
        const validatedRes = await actionHandler<any>({
            params,
            schema: PostCampFormSchema,
            authorize: true,
        });

        if (validatedRes instanceof Error) {
            return handleError(validatedRes) as ErrorResponse;
        }

        const { camptitle, organizername, city, description, locationlink, startdate, enddate, starttime, endtime, image } = validatedRes.validatedParams || {};
        let imageurl = ""
        if (image) {
            const arrayBuffer = await image.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            try {
                const uploadResult = await new Promise<any>((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    ).end(buffer);
                });
                imageurl = uploadResult.secure_url;
            } catch (error) {
                throw new Error("Failed to upload to upload to cloudinary")
            }

        } else {
            throw new Error("Image file is required")
        }

        const userID = validatedRes.userId
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const userDoc = await User.findOne({ clerkid: userID }).session(session);
            if (!userDoc) {
                throw new Error("User profile not found. Please log in first.");
            }

            const [newcamp] = await Camp.create(
                [
                    {
                        title: camptitle,
                        organizer: organizername,
                        description: description,
                        city: city,
                        locationlink: locationlink,
                        imageurl: imageurl,
                        startDate: new Date(startdate),
                        startTime: new Date(`${startdate}T${starttime}`),
                        endDate: new Date(enddate),
                        endTime: new Date(`${enddate}T${endtime}`),
                        owner: userDoc._id,
                    }
                ],
                { session }
            );

            await session.commitTransaction();
            session.endSession();

            return { success: true, data: JSON.parse(JSON.stringify(newcamp)) };
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
}