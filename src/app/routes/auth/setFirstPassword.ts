import { RouteOptions } from "fastify"
import { authConfig } from "@/app/config"
import { FromSchema } from "json-schema-to-ts"
import { AuthService } from "@/app/services/AuthService"
import { database } from "@/core/database"
import { Password } from "@/core/helpers"
import { logger } from "@/core/server/logger"
import { BadRequestException } from "@/core/exceptions"

const bodySchema = {
  type: "object",
  properties: {
    passwordToken: { type: "string" },
    password: { type: "string", minLength: authConfig.password.minLength },
    confirmPassword: {
      type: "string",
      minLength: authConfig.password.minLength,
    },
  },
  required: ["passwordToken", "password", "confirmPassword"],
} as const

type Body = FromSchema<typeof bodySchema>

export const setFirstPassword: RouteOptions = {
  url: "/user/configure",
  method: "POST",
  schema: {
    body: bodySchema,
  },
  handler: async (req) => {
    const body = req.body as Body

    if (body.password !== body.confirmPassword) {
      throw BadRequestException("password confirmation failed")
    }

    const userId = await AuthService.validateFirstPasswordToken(
      body.passwordToken,
    )

    const user = await database.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        password: true,
      },
    })

    if (!user) {
      logger.warn({ userId }, "non-existent userId in password token")
      throw BadRequestException("invalid password token provided")
    }

    if (user.password) {
      logger.info({ userId }, "trying to configure already configured account")
      throw BadRequestException("user account already configured")
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
      message: "account configured successfully",
    }
  },
}
