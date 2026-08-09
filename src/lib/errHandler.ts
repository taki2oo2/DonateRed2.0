import { NextResponse } from "next/server";
import { RequestError } from "@/lib/errors";

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
): ErrorResponse => {
  if (error instanceof RequestError) {
    return formatResponse(
      responseType,
      error.statusCode,
      error.message,
      error.errors
    ) as ErrorResponse;
  }

  // Fallback for unexpected errors (network failures, runtime exceptions, etc.)
  return formatResponse(
    responseType,
    500,
    error instanceof Error ? error.message : "An unexpected error occurred"
  ) as ErrorResponse;
};

export default handleError;