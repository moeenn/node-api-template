import { RouteShorthandOptionsWithHandler } from "fastify"
import { Auth } from "@/core/helpers"
import {
  RequestPasswordReset,
  RequestPasswordResetSchema,
  ResetForgottenPassword,
  ResetForgottenPasswordSchema,
  ValidatePasswordResetToken,
  ValidatePasswordResetTokenSchema,
} from "./forgotPasswordSchema"
import { ForgotPasswordService } from "./forgotPasswordService"

export const ForgotPasswordController: Record<
  string,
  RouteShorthandOptionsWithHandler
> = {
  requestPasswordReset: {
    schema: { body: RequestPasswordResetSchema },
    handler: async (req) => {
      const body = req.body as RequestPasswordReset
      await ForgotPasswordService.requestPasswordReset(body)
      return {
        message: "password reset request will be processed",
      }
    },
  },

  validatePasswordResetToken: {
    schema: { body: ValidatePasswordResetTokenSchema },
    handler: async (req) => {
      const body = req.body as ValidatePasswordResetToken
      const isValid = await Auth.validatePasswordResetToken(body.token)

      return {
        isValid: isValid !== 0,
      }
    },
  },

  resetForgottenPassword: {
    schema: {
      body: ResetForgottenPasswordSchema,
    },
    handler: async (req) => {
      const body = req.body as ResetForgottenPassword
      await ForgotPasswordService.resetForgottenPassword(body)
      return {
        message: "password updated successfully",
      }
    },
  },
}
