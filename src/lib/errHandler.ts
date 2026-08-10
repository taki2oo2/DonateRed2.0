import { NextResponse } from "next/server";
import { RequestError } from "@/lib/errors";
import { ZodError } from "zod";
import { ValidationError } from "@/lib/errors";
import logger from "./logger";

export type ResponseType = "api" | "server";

const formatResponse = (
  responseType: ResponseType,
  status: number,
  message: string,
  errors?: Record<string, string[]>
) => {
  const responseContent = {
    success: false as const,
    error: {
      message,
      details: errors,
    },
  };

  return responseType === "api"
    ? NextResponse.json(responseContent, { status })
    : { status, ...responseContent };
};

const handleError = (
  error: unknown,
  responseType: ResponseType = "server"
) => {
  if (error instanceof RequestError) {
    return formatResponse(
      responseType,
      error.statusCode,
      error.message,
      error.errors
    ) as ErrorResponse;
  }

  if (error instanceof ZodError) {
    
    const validationError = new ValidationError(
      error.flatten().fieldErrors as Record<string, string[]>
    );
    return formatResponse(
      responseType,
      validationError.statusCode, // 400
      validationError.message, // "Field is required..."
      validationError.errors // { field: ["..."] }
    );
  }

    if (error instanceof Error) {
    // 500 means "Internal Server Error"
    logger.error({error},error.message);
    return formatResponse(responseType, 500, error.message);
  }

  // Fallback for unexpected errors (network failures, runtime exceptions, etc.)
  logger.error({ err: error }, "An unexpected error occurred");
  return formatResponse(
    responseType,
    500,
    error instanceof Error ? error.message : "An unexpected error occurred"
  ) as ErrorResponse;
};

export default handleError;