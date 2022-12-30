import { database } from "@/vendor/entities/database"
import { AuthToken } from "."
import { User, UserWithRelations } from "@/domain/user"
import { Random } from "@/vendor/helpers"
import { authConfig } from "@/app/config"
import { AuthException } from "@/vendor/exceptions"

/**
 *  generate a unique identification token when user successfully logs in
 *
 */
async function createToken(user: User): Promise<AuthToken> {
  const token = await Random.string(authConfig.tokens.length)
  return database.authToken.create({
    data: {
      user_id: user.id,
      token,
    },
  })
}

/**
 *  check if the provided auth token is valid
 *  if valid, return auth token record together with associated user
 *
 */
async function validateToken(
  token: string,
): Promise<AuthToken & { user: UserWithRelations }> {
  const authToken = await database.authToken.findUnique({
    where: { token },
    include: {
      user: {
        include: {
          roles: {
            include: {
              role: true,
            },
          },
        },
      },
    },
  })

  if (!authToken) {
    throw AuthException("invalid auth bearer token")
  }

  return authToken
}

/**
 *  when logging-out a user, we revoke token by removing it from db
 *
 */
async function revokeToken(token: AuthToken) {
  await database.authToken.delete({
    where: {
      id: token.id,
    },
  })
}

export const authTokenService = {
  createToken,
  validateToken,
  revokeToken,
}
