import { database } from "@/core/database"
import { AuthException } from "@/core/exceptions"
import { logger } from "@/core/server/logger"
import { validateToken } from "@/core/server/middleware"
import { RouteOptions } from "fastify"
import { FromSchema } from "json-schema-to-ts"

const bodySchema = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: ["name"],
} as const

type Body = FromSchema<typeof bodySchema>

export const updateUserProfile: RouteOptions = {
  url: "/user/profile",
  method: "POST",
  preValidation: [validateToken],
  schema: {
    body: bodySchema,
  },
  handler: async (req) => {
    const body = req.body as Body
    const userId = req.requestContext.get("userId")

    const user = await database.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      logger.error({ userId }, "non-existent user in json token")
      throw AuthException("cannot update user profile")
    }

    const updatedUser = await database.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: body.name,
      },
    })

    return {
      message: "user profile updated successfully",
      profile: updatedUser,
    }
  },
}
