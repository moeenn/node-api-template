import { UserService } from "@/app/domain/user"
import {
  RequestPasswordResetRequest,
  ValidateTokenRequest,
  ResetForgottenPasswordRequest,
} from "./ForgotPassword.schema"
import { AuthService } from "@/app/domain/auth"
import { ForgotPasswordEmail } from "@/app/emails"
import { EmailService } from "@/core/email"

export const ForgotPasswordController = {
  /**
   * if a user forgets the password for their account, they will request
   * a password reset, if the provided details make sense. we create
   * a password reset token for them
   */
  async requestPasswordReset(args: RequestPasswordResetRequest) {
    const user = await UserService.getUserByEmail(args.email)

    /**
     * if the provided email address is invalid, we can simply fail silently
     *
     */
    if (!user) return

    const token = await AuthService.generatePasswordResetToken(user.id)
    const email = new ForgotPasswordEmail({ resetToken: token })

    /* don't await, send in the background */
    EmailService.instance().sendEmail(user.email, email)
  },

  /**
   * check if the provided password reset token is valid
   *
   */
  async validateToken(args: ValidateTokenRequest): Promise<boolean> {
    const result = await AuthService.validatePasswordResetToken(args.token)
    return result != 0
  },

  /**
   * reset the user password using password reset token
   *
   */
  async resetForgottenPassword(args: ResetForgottenPasswordRequest) {
    const userID = await AuthService.validatePasswordResetToken(args.token)
    const user = await UserService.getUserByIDWithPassword(userID)

    /* set new password */
    await UserService.setUserPassword(user, args.password)
  },
}
