import createError from "@fastify/error"

function generateError(code: string, statusCode: number) {
  return (message: string, details?: unknown) => {
    const json = JSON.stringify({ message, details })
    const ex = createError(code, json, statusCode)
    return new ex()
  }
}

export const BadRequestException = generateError("BAD_REQUEST", 400)
export const AuthException = generateError("AUTH_ERROR", 401)
export const NotFoundException = generateError("NOT_FOUND_ERROR", 404)
export const ValidationException = generateError("VALIDATION_ERROR", 422)
