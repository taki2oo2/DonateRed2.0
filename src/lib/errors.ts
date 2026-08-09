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