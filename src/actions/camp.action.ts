"use server";

import * as z from "zod";
import { Camp as CampModel, ICamp } from "@/database/camp.model";
import { User } from "@/database/user.model";
import { GetCampsSchmea, PostCampFormSchema } from "@/lib/validations";
import { actionHandler } from "@/lib/actionHandler";
import handleError from "@/lib/errHandler";
import mongoose from "mongoose";
import cloudinary from "@/lib/cloudinary";
import logger from "@/lib/logger";

export type CreateCampParams = z.infer<typeof PostCampFormSchema>;

export const createcamp = async (
    params: CreateCampParams,
): Promise<ActionResponse<ICamp>> => {
    try {
        const validatedRes = await actionHandler<any>({
            params,
            schema: PostCampFormSchema,
            authorize: true,
        });

        if (validatedRes instanceof Error) {
            return handleError(validatedRes) as ErrorResponse;
        }

        const {
            camptitle,
            organizername,
            city,
            description,
            locationlink,
            startdate,
            enddate,
            starttime,
            endtime,
            image,
        } = validatedRes.validatedParams 
        let imageurl = "";
        if (image) {
            try {
                const arrayBuffer = await image.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                const uploadResult = await new Promise<any>((resolve, reject) => {
                    cloudinary.uploader
                        .upload_stream((error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        })
                        .end(buffer);
                });

                imageurl = uploadResult.secure_url;
                if (!imageurl) {
                    logger.error("image upload to cloudinary failed, No Url recived");
                    throw new Error("Image Upload failed please try again");
                }
            } catch (error) {
                throw error;
            }
        } else {
            throw new Error("Image file is required");
        }

        const userID = validatedRes.userId;
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const userDoc = await User.findOne({ clerkid: userID }).session(session);
            if (!userDoc) {
                throw new Error("User profile not found. Please log in first.");
            }

            const [newcamp] = await CampModel.create(
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
                    },
                ],
                { session },
            );
            if (!newcamp)
                throw new Error("Failed to create a new camp post. Please Try Again");
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
};

export const getCamps = async (
    params: GetCampsParams
): Promise<
    ActionResponse<{
        camps: Camp[];
        isNext: boolean;
        totalResults: number;
    }>
> => {
    try {
        const validatedRes = await actionHandler({
            params,
            schema: GetCampsSchmea,
            authorize: false,
        });

        if (validatedRes instanceof Error) {
            return handleError(validatedRes) as ErrorResponse;
        }
        
        const {city , page = 1, pageSize = 6, } = validatedRes.validatedParams

        const skip = (Number(page) - 1) * pageSize;
        const limit = Number(pageSize);

        const filter = { city: city, endTime: { $gte: new Date() } };

        const totalCamps = await CampModel.countDocuments(filter);

        const camps = await CampModel.find(filter).skip(skip).limit(limit);

        const isNext = totalCamps > skip + camps.length;


        return {
            success: true,
            data: {
                camps: JSON.parse(JSON.stringify(camps)),
                isNext,
                totalResults:totalCamps,
            },
        };
    } catch (error) {
       return handleError(error) as ErrorResponse
    }
};
