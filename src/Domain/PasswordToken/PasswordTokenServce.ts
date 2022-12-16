import { Service } from "typedi"
import { PasswordToken } from "."
import { User } from "@/Domain/User"
import { Database } from "@/Vendor/Entities/Database"
import { Random } from "@/Vendor/Helpers"
import { AuthConfig } from "@/Application/Config"

@Service()
export class PasswordTokenService {
  constructor(private db: Database, private authConfig: AuthConfig) {}

  /**
   *  when a new user is registered, they have an empty password. they must
   *  use their password token to set a password
   */
  public async createToken(user: User): Promise<PasswordToken> {
    const token = await Random.string(this.authConfig.tokens_length)

    if (user.password) {
      throw new Error(
        "cannot create password token, user's password has already been set",
      )
    }

    return this.db.conn.passwordToken.create({
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
  public async deleteToken(user: User) {
    await this.db.conn.passwordToken.delete({
      where: {
        user_id: user.id,
      },
    })
  }
}
