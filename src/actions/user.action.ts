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


export const isUserDonor = async (userId: string): Promise<ActionResponse<IUser>> => {
  try {
    await dbConnect();
    const dbUser = await User.findOne({ clerkid: userId }).lean<IUser>();
    return { success: true, data: dbUser || undefined, status: 200 };
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

export const removeDonorStatus = async (clerkid: string): Promise<ActionResponse<any>> => {
  try {
    if (!clerkid) {
      return { success: false, error: { message: "Clerk ID is required." } };
    }

    await dbConnect();

    const updatedUser = await User.findOneAndUpdate(
      { clerkid },
      { isDonar: false },
      { new: true }
    );

    return { success: true, data: JSON.parse(JSON.stringify(updatedUser)) };
  } catch (error) {
    return handleError(error, "server") as ErrorResponse;
  }
};