import { PasswordToken } from "."
import { User } from "@/domain/user"
import { database } from "@/vendor/entities/database"
import { Random } from "@/vendor/helpers"
import { authConfig } from "@/app/config"
import { NotFoundException } from "@/vendor/exceptions"

/**
 *  find a single password token using its token value
 *
 */
async function findToken(
  token: string,
): Promise<PasswordToken & { user: User }> {
  const passwordToken = await database.passwordToken.findUnique({
    where: { token },
    include: {
      user: true,
    },
  })

  if (!passwordToken) {
    throw NotFoundException("password token not found", { token })
  }

  return passwordToken
}

/**
 *  when a new user is registered, they have an empty password. they must
 *  use their password token to set a password
 */
async function createToken(user: User): Promise<PasswordToken> {
  const token = await Random.string(authConfig.tokens.length)

  if (user.password) {
    throw new Error(
      "cannot create password token, user's password has already been set",
    )
  }

  return database.passwordToken.create({
    data: {
      user_id: user.id,
      token,
    },
  })
}

/**
 *  remove password token after a user's password has been set
 *
 */
async function deleteToken(token: PasswordToken) {
  await database.passwordToken.delete({
    where: {
      id: token.id,
    },
  })
}

export const passwordTokenService = {
  findToken,
  createToken,
  deleteToken,
}
