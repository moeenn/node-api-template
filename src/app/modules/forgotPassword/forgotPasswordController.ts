import { RouteOptions } from "fastify"
import { Auth } from "@/core/helpers"
import {
  RequestPasswordReset,
  RequestPasswordResetSchema,
  ResetForgottenPassword,
  ResetForgottenPasswordSchema,
  ValidatePasswordResetToken,
  ValidatePasswordResetTokenSchema,
} from "./forgotPassword.schema"
import { ForgotPasswordService } from "./forgotPasswordService"

const requestPasswordReset: RouteOptions = {
  url: "/forgot-password/request-reset",
  method: "POST",
  schema: {
    body: RequestPasswordResetSchema,
  },
  handler: async (req) => {
    const body = req.body as RequestPasswordReset
    await ForgotPasswordService.requestPasswordReset(body)
    return {
      message: "password reset request will be processed",
    }
  },
}

const validatePasswordResetToken: RouteOptions = {
  url: "/forgot-password/validate-reset-token",
  method: "POST",
  schema: {
    body: ValidatePasswordResetTokenSchema,
  },
  handler: async (req) => {
    const body = req.body as ValidatePasswordResetToken
    const isValid = await Auth.validatePasswordResetToken(body.token)

    return {
      isValid: isValid !== 0,
    }
  },
}

const resetForgottenPassword: RouteOptions = {
  url: "/forgot-password/reset-password",
  method: "POST",
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
}

export const ForgotPasswordController = {
  requestPasswordReset,
  validatePasswordResetToken,
  resetForgottenPassword,
}
