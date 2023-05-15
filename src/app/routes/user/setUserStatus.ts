import { RouteOptions } from "fastify"
import { validateToken, hasRole } from "@/core/server/middleware"
import { UserRole } from "@prisma/client"
import { FromSchema } from "json-schema-to-ts"
import { db } from "@/core/database"
import { logger } from "@/core/server/logger"
import { BadRequestException } from "@/core/exceptions"

const bodySchema = {
  type: "object",
  properties: {
    userId: { type: "integer" },
    status: { type: "boolean" },
  },
  required: ["userId", "status"],
} as const

type Body = FromSchema<typeof bodySchema>

export const setUserStatus: RouteOptions = {
  url: "/user/set-status",
  method: "POST",
  preValidation: [validateToken, hasRole(UserRole.ADMIN)],
  schema: {
    body: bodySchema,
  },
  handler: async (req) => {
    const body = req.body as Body

    const user = await db.user.findFirst({
      where: {
        id: body.userId,
      },
    })

    if (!user) {
      logger.warn(
        { userId: body.userId },
        "request to set account status for non-existent user",
      )
      throw BadRequestException("invalid user id")
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        approved: body.status,
      },
    })

    return {
      message: "user account status updated successfully",
      updatedStatus: body.status,
    }
  },
}
