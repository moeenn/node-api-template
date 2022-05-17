import status from "http-status"

export class RuntimeError extends Error {
  public details: object

  constructor(message: string, details: object) {
    super(message)
    this.details = details
  }
}

export class ServerError extends Error {
  public status: number
  public details: object

  constructor(status: number, message: string, details: object) {
    super(message)
    this.status = status
    this.details = details
  }
}

export class InternalServerError extends ServerError {
  constructor(details: object) {
    const statusCode = status.INTERNAL_SERVER_ERROR
    const message = "Internal Server Error"

    super(statusCode, message, details)    
  }
}

export class ValidationError extends ServerError {
  constructor(details: object) {
    const statusCode = status.UNPROCESSABLE_ENTITY
    const message = "Unprocessable entry"

    super(statusCode, message, details)
  }
}