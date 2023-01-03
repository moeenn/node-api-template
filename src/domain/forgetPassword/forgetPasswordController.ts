import { userService } from "@/domain/user"
import {
  IRequestPasswordReset,
  IValidateToken,
  IResetForgottenPassword,
} from "./forgetPasswordController.schema"
import { authService } from "@/domain/auth"

/**
 *  if a user forgets the password for their account, they will request
 *  a password reset, if the provided details make sense. we create
 *  a password reset token for them
 */
async function requestPasswordReset(
  args: IRequestPasswordReset,
): Promise<string> {
  const user = await userService.getUserByEmail(args.email)
  const token = await authService.generatePasswordResetToken(user.id)

  /* TODO: send email to user */
  return token
}

/**
 *  check if the provided password reset token is valid
 *
 */
async function validateToken(args: IValidateToken): Promise<boolean> {
  const result = await authService.validatePasswordResetToken(args.token)
  return result != 0
}

/**
 *  reset the user password using password reset token
 *
 */
async function resetForgottenPassword(args: IResetForgottenPassword) {
  const userID = await authService.validatePasswordResetToken(args.token)
  const user = await userService.getUserByIDWithPassword(userID)

  /* set new password */
  await userService.setUserPassword(user, args.password)
}

export const forgetPasswordController = {
  requestPasswordReset,
  validateToken,
  resetForgottenPassword,
}
