import { RouteOptions } from "fastify"
import { Auth } from "@/core/helpers"
import { bodySchema, Body } from "./validatePasswordResetToken.schema"

export const validatePasswordResetToken: RouteOptions = {
  url: "/forgot-password/validate-reset-token",
  method: "POST",
  schema: {
    body: bodySchema,
  },
  handler: async (req) => {
    const body = req.body as Body
    const isValid = await Auth.validatePasswordResetToken(body.token)

    return {
      isValid: isValid !== 0,
    }
  },
}
