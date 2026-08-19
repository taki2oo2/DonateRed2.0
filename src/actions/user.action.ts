"use server"

import dbConnect from "@/lib/moongoose";
import { IUser, User } from "@/database/user.model";
import handleError from "@/lib/errHandler";
import { actionHandler } from "@/lib/actionHandler";
import { changeDonorSchema, GetDonorsSchema, RegisterDonorValidationSchema, GetUserDetailSchema } from "@/lib/validations";
import { NotFoundError } from "@/lib/errors";

interface RegisterDonorParams {
  clerkid: string;
  fullname: string;
  email: string;
  contactno: string;
  city: string;
  bloodGroup: string;
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

export const changeDonorStatus = async (params: changeDonorParams): Promise<ActionResponse<boolean>> => {
  try {
    const validatedRes = await actionHandler({
      params,
      schema: changeDonorSchema,
      authorize: true,
    });

    if (validatedRes instanceof Error) {
      return handleError(validatedRes) as ErrorResponse;
    }

    const { isDonar } = validatedRes.validatedParams;
    const userId = validatedRes.userId;

    if (!userId) {
      return { success: false, error: { message: "Unauthorized. User ID not found." } };
    }

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

    const { fullname, email, contactno, city, bloodGroup, eligibility } = validatedParams || {};

    if (!fullname || !email || !contactno || !city || !bloodGroup || !eligibility) {
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
        bloodGroup,
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


export const getDonors = async (params: GetDonorsParams): Promise<ActionResponse<{
  donors: Donor[];
  isNext: boolean;
  totalDonors: number;
}>> => {

  try {
    const validatedRes = await actionHandler({
      params,
      schema: GetDonorsSchema,
      authorize: false,
    });

    if (validatedRes instanceof Error) {
      return handleError(validatedRes) as ErrorResponse;
    }

    const { city, page = 1, pageSize = 5, bloodGroup } = validatedRes.validatedParams

    const skip = (Number(page) - 1) * pageSize;
    const limit = Number(pageSize);

    const filter = {
      city: city, bloodGroup: bloodGroup,
      isDonar: true
    };

    const totalDonors = await User.countDocuments(filter);

    const donors = await User.find(filter).select('_id email fullname city contactno bloodGroup').skip(skip).limit(limit);

    const isNext = totalDonors > skip + donors.length;

    return {
      success: true,
      data: {
        donors: JSON.parse(JSON.stringify(donors)),
        isNext,
        totalDonors,
      }
    }
  } catch (error) {
    return handleError(error) as ErrorResponse
  }
}


export const getUerInfo = async (params: GetUserDetailsParams): Promise<ActionResponse<User>> => {
  try {
    const validatedRes = await actionHandler({params, schema:GetUserDetailSchema, authorize: true})
    if (validatedRes instanceof Error) {
      return handleError(validatedRes) as ErrorResponse;
    }
    const {userId} = validatedRes
    if(!userId){
      throw new Error("user id not found")
    }
    const user = await User.findOne({ clerkid: userId }).lean();
    if(!user){
      throw new NotFoundError("User not found Try logging in again")
    }
    return {
      success:true,
      data:JSON.parse(JSON.stringify(user)),
      status:200
    }
  } catch (error) {
    return handleError(error) as ErrorResponse
  }
}