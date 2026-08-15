"use server"

import dbConnect from "@/lib/moongoose";
import { IUser, User} from "@/database/user.model";
import handleError from "@/lib/errHandler";
import { actionHandler } from "@/lib/actionHandler";

import { RegisterDonorValidationSchema } from "@/lib/validations";

interface RegisterDonorParams {
  clerkid: string;
  fullname: string;
  email: string;
  contactno: string;
  city: string;
  eligibility: {
    ageEligible: string;
    weightEligible: string;
    chronicIllness: string;
    medicalConditions: string[];
    pregnantOrRecent: string;
    breastfeeding: string;
    consentSharePhone: string;
    consentEmergency: string;
  };
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

export const changeDonorStatus = async (isDonar: boolean): Promise<ActionResponse<boolean>> => {
  try {
    const { userId } = await actionHandler<void>({ authorize: true });

    const dbUser = await User.findOneAndUpdate(
      { clerkid: userId },
      { isDonar },
      { new: true }
    );

    return { success: true, data: dbUser?.isDonar || false, status: 200 };
  } catch (error) {
    return handleError(error, "server") as ErrorResponse;
  }
};

export const registerAsDonor = async (params: RegisterDonorParams): Promise<ActionResponse<IUser>> => {
  try {
    const { userId, validatedParams } = await actionHandler<any>({
      params,
      schema: RegisterDonorValidationSchema,
      authorize: true,
    });

    const { fullname, email, contactno, city, eligibility } = validatedParams || {};

    if (!fullname || !email || !contactno || !city || !eligibility) {
      return { success: false, error: { message: "All fields are required to register as a donor." } };
    }

    // Server-Side Eligibility Validation
    const isEligible =
      eligibility.ageEligible === "yes" &&
      eligibility.weightEligible === "yes" &&
      eligibility.chronicIllness === "no" &&
      eligibility.medicalConditions.length === 1 &&
      eligibility.medicalConditions.includes("none") &&
      eligibility.pregnantOrRecent !== "yes" &&
      eligibility.breastfeeding !== "yes" &&
      eligibility.consentSharePhone === "yes" &&
      eligibility.consentEmergency === "yes";

    if (!isEligible) {
      return { success: false, error: { message: "Based on validation, you are not eligible to register as a donor." } };
    }

    const updatedUser = await User.findOneAndUpdate(
      { clerkid: userId },
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
