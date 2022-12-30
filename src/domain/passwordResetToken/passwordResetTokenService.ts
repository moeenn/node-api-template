import { PasswordResetToken } from "."
import { User } from "@/domain/user"
import { database } from "@/vendor/entities/database"
import { authConfig } from "@/app/config"
import { Random } from "@/vendor/helpers"

/**
 *  find a single password reset token using its token value
 *
 */
async function findToken(
  token: string,
): Promise<(PasswordResetToken & { user: User }) | undefined> {
  const passwordResetToken = await database.passwordResetToken.findUnique({
    where: { token },
    include: {
      user: true,
    },
  })

  if (!passwordResetToken) return
  return passwordResetToken
}

/**
 *  if case a user forgets their account password, they request a password
 *  reset. If the provided details for reset are accurate, we create a
 *  password reset token which will be required for setting the new password
 *
 */
async function createToken(user: User): Promise<PasswordResetToken> {
  const token = await Random.string(authConfig.tokens.length)

  return database.passwordResetToken.create({
    data: {
      user_id: user.id,
      token,
    },
  })
}

/**
 *  remove password reset token after the user has successfully set the
 *  account password
 *
 */
async function deleteToken(token: PasswordResetToken) {
  await database.passwordResetToken.delete({
    where: {
      id: token.id,
    },
  })
}

export const passwordResetTokenService = {
  findToken,
  createToken,
  deleteToken,
}
