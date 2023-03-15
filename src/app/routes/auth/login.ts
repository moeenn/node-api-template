import { RouteOptions } from "fastify"
import { authConfig } from "@/app/config"
import { FromSchema } from "json-schema-to-ts"
import { database } from "@/core/database"
import { AuthException, BadRequestException } from "@/core/exceptions"
import { Password } from "@/core/helpers"
import { AuthService } from "@/app/services/Auth.service"

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
  schema: {
    body: bodySchema,
  },
  handler: async req => {
    const body = req.body as Body

    const user = await database.user.findFirst({
      where: {
        email: body.email,
      },
      include: {
        password: true,
      }
    })

    if (!user) {
      throw AuthException("invalid email or password")
    }

    if (!user.password) {
      throw BadRequestException("account not configured")
    }

    if (!user.approved) {
      throw BadRequestException("user account disabled by admin")
    }

    const isValid = await Password.verify(user.password.hash, body.password)
    if (!isValid) {
      throw AuthException("invalid email or password")
    }

    const token = await AuthService.generateLoginAuthToken(user.id, user.role)

    return {
      message: "login successful",
      user,
      token,
    }
  }
}