import { logger } from "@/core/server/logger"
import { RouteOptions } from "fastify"
import { Auth } from "@/core/helpers"
import { ForgotPasswordEmail } from "@/app/emails"
import { EmailService } from "@/core/email"
import { RequestPasswordReset, RequestPasswordResetSchema, ResetForgottenPassword, ResetForgottenPasswordSchema, ValidatePasswordResetToken, ValidatePasswordResetTokenSchema } from "./forgotPassword.schema"
import { UserRepository } from "../user/userRepository"
import { AuthException, BadRequestException } from "@/core/exceptions"

const requestPasswordReset: RouteOptions = {
  url: "/forgot-password/request-reset",
  method: "POST",
  schema: {
    body: RequestPasswordResetSchema,
  },
  handler: async (req) => {
    const body = req.body as RequestPasswordReset

    const user = await UserRepository.findByEmail(body.email)
    if (!user) {
      logger.info(
        { email: body.email },
        "password reset request for non-existent user",
      )
      return {
        message: "password reset request will be processed",
      }
    }

    const token = await Auth.generatePasswordResetToken(user.id)
    const email = new ForgotPasswordEmail({ resetToken: token.token })

    /** don't await, send in the background */
    EmailService.instance().sendEmail(user.email, email)
    logger.info(
      { email: body.email },
      "sending forgot password (password reset) email",
    )

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

    if (body.password !== body.confirmPassword) {
      throw BadRequestException("password confirmation failed")
    }

    const userId = await Auth.validatePasswordResetToken(body.token)
    const user = await UserRepository.findById(userId)

    if (!user)
      throw AuthException("cannot reset password", {
        userId,
        message: "id of non-existent user in json token",
      })

    await UserRepository.updateUserPassword(user, body.password)
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