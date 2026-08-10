"use server"

import dbConnect from "@/lib/moongoose";
import { User, IUser } from "@/database/user.model";
import handleError from "@/lib/errHandler";
import {actionHandler} from "@/lib/actionHandler"

interface RegisterDonorParams {
  clerkid: string;
  fullname: string;
  email: string;
  contactno: string;
  city: string;
}


export const isUserDonor = async (userId: string): Promise<ActionResponse<boolean>> => {
  try {
    await dbConnect();
    const dbUser = await User.findOne({ clerkid: userId }).select("isDonar").lean();
    return { success: true, data: dbUser?.isDonar || false, status: 200 };
  } catch (error) {
    return handleError(error, "server") as ErrorResponse;
  }
};

export const stopDonor = async (): Promise<ActionResponse<boolean>> => {
  try {
    const { userId } = await actionHandler<void>({ authorize: true });
    await User.findOneAndUpdate(
      { clerkid: userId },
      { isDonar: false },
      { new: true }
    );
    return { success: true, data: true, status: 200 };
  } catch (error) {
    return handleError(error, "server") as ErrorResponse;
  }
};

export const registerAsDonor = async (params: RegisterDonorParams): Promise<ActionResponse<any>> => {
  try {
    const { clerkid, fullname, email, contactno, city } = params;

    if (!clerkid || !fullname || !email || !contactno || !city) {
      return { success: false, error: { message: "All fields are required to register as a donor." } };
    }

    await dbConnect();

    const updatedUser = await User.findOneAndUpdate(
      { clerkid },
      {
        fullname,
        email,
        contactno,
        city,
        isDonar: true,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return { success: true, data: JSON.parse(JSON.stringify(updatedUser)) };
  } catch (error) {
    return handleError(error, "server") as ErrorResponse;
  }
};
