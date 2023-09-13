import { logger } from "@/core/server/logger"
import { UserRepository } from "@/app/modules/user/userRepository"
import { RequestPasswordReset } from "./forgotPassword.schema"
import { Auth } from "@/core/helpers"
import { ForgotPasswordEmail } from "@/app/emails"
import { EmailService } from "@/core/email"
import { ResetForgottenPassword } from "./forgotPassword.schema"
import { AuthException, BadRequestException } from "@/core/exceptions"
import { PasswordRepository } from "@/app/modules/password/passwordRepository"

export const ForgotPasswordService = {
  async requestPasswordReset(args: RequestPasswordReset): Promise<void> {
    const user = await UserRepository.findByEmail(args.email)
    if (!user) {
      logger.info(
        { email: args.email },
        "password reset request for non-existent user",
      )
      return
    }

    const token = await Auth.generatePasswordResetToken(user.id)
    const email = new ForgotPasswordEmail({ resetToken: token.token })

    /** don't await, send in the background */
    EmailService.instance().sendEmail(user.email, email)
    logger.info(
      { email: args.email },
      "sending forgot password (password reset) email",
    )
  },

  async resetForgottenPassword(args: ResetForgottenPassword): Promise<void> {
    if (args.password !== args.confirmPassword) {
      throw BadRequestException("password confirmation failed")
    }

    const userId = await Auth.validatePasswordResetToken(args.token)
    const user = await UserRepository.findById(userId)

    if (!user)
      throw AuthException("cannot reset password", {
        userId,
        message: "id of non-existent user in json token",
      })

    await PasswordRepository.updateUserPassword(user, args.password)
  },
}
