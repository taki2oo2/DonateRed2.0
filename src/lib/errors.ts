export class RequestError extends Error {
  statusCode: number;
  errors?: Record<string, string[]>;

  constructor(
    statusCode: number,
    message: string,
    errors?: Record<string, string[]>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = "RequestError";
  }
}

export class NotFoundError extends RequestError {
  constructor(resource: string) {
    // 404 is HTTP status for "Not Found"
    super(404, `${resource} not found`);
    
    // Custom error name
    this.name = "NotFoundError";
  }
}

export class ValidationError extends RequestError {
  constructor(fieldErrors: Record<string, string[]>) {
    // We convert structured field errors into a single human-readable message
    const message:string = ValidationError.formatFieldErrors(fieldErrors);

    // Call parent constructor
    // 400 means "Bad Request"
    super(400, message, fieldErrors);

    // Override error name
    this.name = "Validation";

    // Explicitly set errors (not strictly required because parent does it)
    this.errors = fieldErrors;
  }

  static formatFieldErrors(fieldErrors: Record<string, string[]>): string {
    return Object.entries(fieldErrors)
      .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
      .join(". ");
  }
}

export class ConflictError extends RequestError {
  constructor(message: string = "Resource already exists") {
    // 409 is HTTP status for "Conflict"
    super(409, message);
    this.name = "ConflictError";
  }
}

export class UnauthorizedError extends RequestError {
  constructor(message: string = "Unauthorized") {
    // 401 means authentication required
    super(401, message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends RequestError {
  constructor(message: string = "Forbidden") {
    // 403 means authenticated but not allowed
    super(403, message);
    this.name = "ForbiddenError";
  }
}