import { Service } from "typedi"
import { Database } from "@/Vendor/Entities/Database"
import { AuthToken } from "."
import { User } from "@/Domain/User"
import { Random } from "@/Vendor/Helpers"
import { AuthConfig } from "@/Application/Config"
import { AuthException } from "@/Vendor/Exceptions"

@Service()
export class AuthTokenService {
  constructor(private db: Database, private authConfig: AuthConfig) {}

  /**
   *  generate a unique identification token when user successfully logs in
   *
   */
  public async createToken(user: User): Promise<AuthToken> {
    const token = await Random.string(this.authConfig.tokens_length)
    return this.db.conn.authToken.create({
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
  public async validateToken(
    token: string,
  ): Promise<AuthToken & { user: User }> {
    const authToken = await this.db.conn.authToken.findUnique({
      where: { token },
      include: {
        user: true,
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
  public async revokeToken(token: AuthToken) {
    await this.db.conn.authToken.delete({
      where: {
        id: token.id,
      },
    })
  }
}
