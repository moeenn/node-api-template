import { userService } from "@/domain/user"
import {
  IRequestPasswordReset,
  IValidateToken,
  IResetForgottenPassword,
} from "./forgetPasswordController.schema"
import { authConfig } from "@/app/config"
import { JWT, env } from "@/vendor/helpers"
import { BadRequestException } from "@/vendor/exceptions"

/**
 *  if a user forgets the password for their account, they will request
 *  a password reset, if the provided details make sense. we create
 *  a password reset token for them
 */
async function requestPasswordReset(
  args: IRequestPasswordReset,
): Promise<string> {
  const user = await userService.getUserByEmail(args.email)
  const token = await JWT.generate(
    env("JWT_SECRET"),
    { userID: user.id },
    authConfig.tokensExpiry.passwordReset,
  )

  /* TODO: send email to user */
  return token
}

/**
 *  check if the provided password reset token is valid
 *
 */
async function validateToken(args: IValidateToken): Promise<boolean> {
  const result = await JWT.validate(env("JWT_SECRET"), args.token)
  return !result ? false : true
}

/**
 *  reset the user password using password reset token
 *
 */
async function resetForgottenPassword(args: IResetForgottenPassword) {
  const result = await JWT.validate(env("JWT_SECRET"), args.token)
  if (!result) {
    throw BadRequestException("invalid password reset token")
  }

  const { userID } = result as { userID: number }
  const user = await userService.getUserByIDWithPassword(userID)

  /* set new password */
  await userService.setUserPassword(user, args.password)
}

export const forgetPasswordController = {
  requestPasswordReset,
  validateToken,
  resetForgottenPassword,
}
