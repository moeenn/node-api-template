import { userService } from "@/domain/user"
import {
  IRequestPasswordReset,
  IValidateToken,
  IResetForgottenPassword,
} from "./forgetPasswordController.schema"
import {
  PasswordResetToken,
  passwordResetTokenService,
} from "@/domain/passwordResetToken"
import { BadRequestException } from "@/vendor/exceptions"

/**
 *  if a user forgets the password for their account, they will request
 *  a password reset, if the provided details make sense. we create
 *  a password reset token for them
 */
async function requestPasswordReset(
  args: IRequestPasswordReset,
): Promise<PasswordResetToken> {
  const user = await userService.getUserByEmail(args.email)
  return await passwordResetTokenService.createToken(user)

  /* TODO: send email to user */
  /* TODO: auto-delete token after n-minutes */
}

/**
 *  check if the provided password reset token is valid
 *
 */
async function validateToken(args: IValidateToken): Promise<boolean> {
  const token = await passwordResetTokenService.findToken(args.token)
  if (!token) return false
  return true
}

/**
 *  reset the user password using password reset token
 *
 */
async function resetForgottenPassword(args: IResetForgottenPassword) {
  const token = await passwordResetTokenService.findToken(args.token)
  if (!token) {
    throw BadRequestException("invalid password reset token", {
      token: args.token,
    })
  }

  /* set new password */
  await userService.setUserPassword(token.user, args.password)

  /**
   *  password reset token should only be used once, i.e. delete after use
   */
  await passwordResetTokenService.deleteToken(token)
}

export const forgetPasswordController = {
  requestPasswordReset,
  validateToken,
  resetForgottenPassword,
}
