import { RouteOptions } from "fastify"
import { authConfig } from "@/app/config"
import { FromSchema } from "json-schema-to-ts"
import { db } from "@/core/database"
import { AuthException, BadRequestException } from "@/core/exceptions"
import { Password } from "@/core/helpers"
import { AuthService } from "@/core/services/AuthService"
import { logger } from "@/core/server/logger"

const bodySchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string", minLength: authConfig.password.minLength },
  },
  required: ["email", "password"],
} as const

type Body = FromSchema<typeof bodySchema>

export const login: RouteOptions = {
  url: "/login",
  method: "POST",
  config: {
    rateLimit: {
      max: 10,
      timeWindow: 1000 * 60 /* 1 minute */,
    },
  },
  schema: {
    body: bodySchema,
  },
  handler: async (req) => {
    const body = req.body as Body

    const user = await db.user.findFirst({
      where: {
        email: body.email,
      },
      include: {
        password: true,
      },
    })

    if (!user) {
      logger.warn({ email: body.email }, "login against non-existent user")
      throw AuthException("invalid email or password")
    }

    if (!user.password) {
      logger.info(
        { email: body.email },
        "failed login against non-configured account",
      )
      throw BadRequestException("account not configured")
    }

    if (!user.approved) {
      logger.info(
        { email: body.email },
        "failed login against disabled account",
      )
      throw BadRequestException("user account disabled by admin")
    }

    /** validate the actual password */
    const isValid = await Password.verify(user.password.hash, body.password)
    if (!isValid) {
      logger.warn({ email: body.email }, "invalid login password")
      throw AuthException("invalid email or password")
    }

    const token = await AuthService.generateLoginAuthToken(user.id, user.role)

    return {
      message: "login successful",
      user: Object.assign(user, { password: undefined }),
      token,
    }
  },
}
