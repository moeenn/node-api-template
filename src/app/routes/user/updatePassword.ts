import { authConfig } from "@/app/config"
import { database } from "@/core/database"
import { AuthException, BadRequestException } from "@/core/exceptions"
import { Password } from "@/core/helpers"
import { logger } from "@/core/server/logger"
import { validateToken } from "@/core/server/middleware"
import { RouteOptions } from "fastify"
import { FromSchema } from "json-schema-to-ts"

const bodySchema = {
  type: "object",
  properties: {
    password: { type: "string", minLength: authConfig.password.minLength },
    confirmPassword: {
      type: "string",
      minLength: authConfig.password.minLength,
    },
  },
  required: ["password", "confirmPassword"],
} as const

type Body = FromSchema<typeof bodySchema>

export const updatePassword: RouteOptions = {
  url: "/user/update-password",
  method: "POST",
  preValidation: [validateToken],
  schema: {
    body: bodySchema,
  },
  handler: async (req) => {
    const body = req.body as Body
    const userId = req.requestContext.get("userId")

    if (body.password !== body.confirmPassword) {
      throw BadRequestException("password confirmation failed")
    }

    const user = await database.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      logger.error({ userId }, "non-existent user id in json token")
      throw AuthException("cannot update user password")
    }

    await database.password.update({
      where: {
        userId: user.id,
      },
      data: {
        hash: await Password.hash(body.password),
      },
    })

    return {
      message: "account password updated successfully",
    }
  },
}
