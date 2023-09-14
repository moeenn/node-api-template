import createError from "@fastify/error"
import { logger } from "@/core/server/logger"

function generateError(code: string, statusCode: number) {
  return (error: string, details?: Record<string, unknown>) => {
    logger.warn(details ?? { error })
    const ex = createError(code, error, statusCode)
    return new ex()
  }
}

export const BadRequestException = generateError("BAD_REQUEST", 400)
export const AuthException = generateError("AUTH_ERROR", 401)
export const ForbiddenException = generateError("FORBIDDEN_ERROR", 403)
export const NotFoundException = generateError("NOT_FOUND_ERROR", 404)
export const ValidationException = generateError("VALIDATION_ERROR", 422)
