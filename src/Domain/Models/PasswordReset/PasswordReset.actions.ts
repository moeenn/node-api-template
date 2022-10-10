import {
  PasswordReset,
  IDocumentPasswordReset,
  IDocumentUser,
} from "@/Domain/Models"
import { Exception } from "@/Application/Exceptions"
import { Password } from "@/Application/Helpers"

interface IResetPasswordData {
  token: string
  password: string
}

/**
 *  create a new password reset token
 *
 */
async function createPasswordResetToken(
  user: IDocumentUser,
  token: string,
): Promise<IDocumentPasswordReset> {
  const reset = new PasswordReset.repo({ user, token })
  await reset.save()

  return reset
}

/**
 *  reset a forgotten password
 *
 */
async function resetUserPassword(data: IResetPasswordData) {
  const reset = await PasswordReset.repo.findOne({ token: data.token })
  // .populate("user")

  if (!reset || !reset.user) {
    throw new Exception("invalid reset token", 400)
  }

  reset.user.password = await Password.hash(data.password)
  await reset.user.save()

  await PasswordReset.repo.find({ user: reset.user }).deleteMany().exec()
}

export const PasswordResetActions = {
  createPasswordResetToken,
  resetUserPassword,
}
