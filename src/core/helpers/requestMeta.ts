import { FastifyRequest } from "fastify"
import { logger } from "@/core/server/logger"
import { UserRole } from "@prisma/client"

/**
 * Quickly read all request metadata
 *
 */
export function requestMeta(req: FastifyRequest): {
  userId: number
  userRole: UserRole
} {
  const userId = req.requestContext.get("userId" as never) as number | undefined
  const userRole = req.requestContext.get("userRole" as never) as
    | UserRole
    | undefined

  if (!userId || !userRole) {
    logger.error("missing expected components in the verified JWT")
    throw new Error("failed to process request")
  }

  return { userId, userRole }
}
