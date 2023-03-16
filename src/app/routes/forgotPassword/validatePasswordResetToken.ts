import { RouteOptions } from "fastify"
import { FromSchema } from "json-schema-to-ts"
import { AuthService } from "@/app/services/AuthService"

const bodySchema = {
  type: "object",
  properties: {
    token: { type: "string" },
  },
  required: ["token"],
} as const

type Body = FromSchema<typeof bodySchema>

export const validatePasswordResetToken: RouteOptions = {
  url: "/forgot-password/validate-reset-token",
  method: "POST",
  schema: {
    body: bodySchema,
  },
  handler: async (req) => {
    const body = req.body as Body
    const isValid = await AuthService.validatePasswordResetToken(body.token)

    return {
      isValid: isValid !== 0,
    }
  },
}
