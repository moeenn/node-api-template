import { RouteOptions } from "fastify"
import { FromSchema } from "json-schema-to-ts"
import { authConfig } from "@/app/config"
import { AuthException, BadRequestException } from "@/core/exceptions"
import { AuthService } from "@/app/services/AuthService"
import { database } from "@/core/database"
import { logger } from "@/core/server/logger"
import { Password } from "@/core/helpers"

export const bodySchema = {
  type: "object",
  properties: {
    token: { type: "string" },
    password: { type: "string", minLength: authConfig.password.minLength },
    confirmPassword: {
      type: "string",
      minLength: authConfig.password.minLength,
    },
  },
  required: ["token", "password", "confirmPassword"],
} as const

export type Body = FromSchema<typeof bodySchema>

export const resetForgottenPassword: RouteOptions = {
  url: "/forgot-password/reset-password",
  method: "POST",
  schema: {
    body: bodySchema,
  },
  handler: async (req) => {
    const body = req.body as Body

    if (body.password !== body.confirmPassword) {
      throw BadRequestException("password confirmation failed")
    }

    const userId = await AuthService.validatePasswordResetToken(body.token)
    const user = await database.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      logger.error({ userId }, "id of non-existent user in json token")
      throw AuthException("cannot reset password")
    }

    const hash = await Password.hash(body.password)
    await database.password.upsert({
      where: {
        userId: user.id,
      },
      update: { hash },
      create: {
        userId: user.id,
        hash,
      },
    })

    return {
      message: "password updated successfully",
    }
  },
}
