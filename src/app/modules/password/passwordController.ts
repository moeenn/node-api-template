import { Password, requestMeta } from "@/core/helpers"
import { validateToken } from "@/core/server/middleware"
import { RouteShorthandOptionsWithHandler } from "fastify"
import {
  UpdateUserPassword,
  UpdateUserPasswordSchema,
  SetFirstPassword,
  SetFirstPasswordSchema,
  CheckPasswordStrength,
  CheckPasswordStrengthSchema,
} from "./passwordSchema"
import { PasswordService } from "./passwordService"

export const PasswordController: Record<
  string,
  RouteShorthandOptionsWithHandler
> = {
  updateUserPassword: {
    preValidation: [validateToken],
    schema: {
      body: UpdateUserPasswordSchema,
    },
    handler: async (req) => {
      const body = req.body as UpdateUserPassword
      const { userId } = requestMeta(req)

      await PasswordService.updateUserPassword(userId, body)
      return {
        message: "account password updated successfully",
      }
    },
  },

  setFirstPassword: {
    schema: {
      body: SetFirstPasswordSchema,
    },
    handler: async (req) => {
      const body = req.body as SetFirstPassword
      await PasswordService.setFirstPassword(body)
      return {
        message: "account configured successfully",
      }
    },
  },

  checkPasswordStrength: {
    schema: {
      body: CheckPasswordStrengthSchema,
    },
    handler: async (req) => {
      const body = req.body as CheckPasswordStrength
      return Password.checkStrength(body.password)
    },
  },
}
