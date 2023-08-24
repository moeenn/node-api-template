import { RouteOptions } from "fastify"
import { AuthService } from "@/core/services/AuthService"
import { bodySchema, Body } from "./validatePasswordResetToken.schema"

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
