import { RouteOptions } from "@/core/server"
import { ForgotPasswordController } from "./ForgotPassword.controller"
import {
  RequestPasswordResetRequestSchema,
  RequestPasswordResetRequest,
  ResetForgottenPasswordRequest,
  ResetForgottenPasswordRequestSchema,
  ValidateTokenRequest,
  ValidateTokenRequestSchema,
} from "./ForgotPassword.schema"
import { BadRequestException } from "@/core/exceptions"

const requestPasswordReset: RouteOptions = {
  url: "/forget-password/request-reset",
  method: "POST",
  schema: {
    body: RequestPasswordResetRequestSchema,
  },
  handler: async (req) => {
    /**
     * if a user is already logged-in, they should not be able to reset
     * their account password through this end-point
     */
    const userID = req.requestContext.get("userId")
    if (userID) {
      throw BadRequestException("please update the password using setting menu")
    }

    await ForgotPasswordController.requestPasswordReset(
      req.body as RequestPasswordResetRequest,
    )

    return {
      message: "password reset request will be processed",
    }
  },
}

const resetForgottenPassword: RouteOptions = {
  url: "/forget-password/reset",
  method: "POST",
  schema: {
    body: ResetForgottenPasswordRequestSchema,
  },
  handler: async (req) => {
    const body = req.body as ResetForgottenPasswordRequest

    if (body.password !== body.confirmPassword) {
      throw BadRequestException("password confirmation failed")
    }

    await ForgotPasswordController.resetForgottenPassword(body)

    return {
      message: "password has been updated successfully",
    }
  },
}

const validatePasswordResetToken: RouteOptions = {
  url: "/forget-password/validate-token",
  method: "POST",
  schema: {
    body: ValidateTokenRequestSchema,
  },
  handler: async (req) => {
    const isValid = await ForgotPasswordController.validateToken(
      req.body as ValidateTokenRequest,
    )

    return {
      is_valid: isValid,
    }
  },
}

export const ForgotPasswordRoutes: RouteOptions[] = [
  requestPasswordReset,
  resetForgottenPassword,
  validatePasswordResetToken,
]
