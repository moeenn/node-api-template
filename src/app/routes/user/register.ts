import { RouteOptions } from "fastify"
import { FromSchema } from "json-schema-to-ts"
import { authConfig } from "@/app/config"
import { BadRequestException } from "@/core/exceptions"
import { database } from "@/core/database"
import { Password } from "@/core/helpers"
import { logger } from "@/core/server/logger"

const bodySchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    name: { type: "string" },
    password: { type: "string", minLength: authConfig.password.minLength },
    confirmPassword: {
      type: "string",
      minLength: authConfig.password.minLength,
    },
  },
  required: ["email", "name", "password", "confirmPassword"],
} as const

type Body = FromSchema<typeof bodySchema>

export const register: RouteOptions = {
  url: "/register",
  method: "POST",
  schema: {
    body: bodySchema,
  },
  handler: async (req) => {
    const body = req.body as Body

    if (body.password !== body.confirmPassword) {
      throw BadRequestException("password confirmation failed")
    }

    /** email address must must be unique */
    const isEmailTaken = await database.user.findFirst({
      where: {
        email: body.email,
      },
    })

    if (isEmailTaken) {
      logger.info(
        { email: body.email },
        "registration request against existing email address",
      )
      throw BadRequestException("email address already in use")
    }

    await database.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: {
          create: {
            hash: await Password.hash(body.password),
          },
        },
      },
    })

    return {
      message: "account created successfully",
    }
  },
}
