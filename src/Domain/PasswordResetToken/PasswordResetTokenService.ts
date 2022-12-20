import { Service } from "typedi"
import { PasswordResetToken } from "."
import { User } from "@/Domain/User"
import { Database } from "@/Vendor/Entities/Database"
import { AuthConfig } from "@/Application/Config"
import { Random } from "@/Vendor/Helpers"
import { Option } from "@/Vendor/Types"

@Service()
export class PasswordResetTokenService {
  constructor(private db: Database, private authConfig: AuthConfig) {}

  /**
   *  find a single password reset token using its token value
   *
   */
  public async findToken(
    token: string,
  ): Promise<Option<PasswordResetToken & { user: User }>> {
    const passwordResetToken = await this.db.conn.passwordResetToken.findUnique(
      {
        where: { token },
        include: {
          user: true,
        },
      },
    )

    if (!passwordResetToken) return
    return passwordResetToken
  }

  /**
   *  if case a user forgets their account password, they request a password
   *  reset. If the provided details for reset are accurate, we create a
   *  password reset token which will be required for setting the new password
   *
   */
  public async createToken(user: User): Promise<PasswordResetToken> {
    const token = await Random.string(this.authConfig.tokens_length)

    return this.db.conn.passwordResetToken.create({
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
  public async deleteToken(token: PasswordResetToken) {
    await this.db.conn.passwordResetToken.delete({
      where: {
        id: token.id,
      },
    })
  }
}
