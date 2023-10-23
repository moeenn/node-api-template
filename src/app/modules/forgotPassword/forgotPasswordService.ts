import { logger } from "@/core/server/logger"
import { UserRepository } from "@/app/modules/user/userRepository"
import { RequestPasswordReset } from "./forgotPasswordSchema"
import { Auth } from "@/core/helpers"
import { ResetForgottenPassword } from "./forgotPasswordSchema"
import { AuthException, BadRequestException } from "@/core/entities/exceptions"
import { PasswordRepository } from "@/app/modules/password/passwordRepository"
import { RequestPasswordResetEvent } from "./events/requestPasswordResetEvent"

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

    new RequestPasswordResetEvent(user).process()
  },

  async resetForgottenPassword(args: ResetForgottenPassword): Promise<void> {
    if (args.password !== args.confirmPassword) {
      throw BadRequestException("password confirmation failed")
    }

    const userId = await Auth.validatePasswordResetToken(args.token)
    const user = await UserRepository.findById(userId)

    if (!user) {
      throw AuthException("cannot reset password", {
        userId,
        message: "id of non-existent user in json token",
      })
    }

    await PasswordRepository.updateUserPassword(user, args.password)
  },
}
