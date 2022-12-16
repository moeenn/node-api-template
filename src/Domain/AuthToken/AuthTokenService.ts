import { Service } from "typedi"
import { Database } from "@/Vendor/Entities/Database"
import { AuthToken } from "."
import { User } from "@/Domain/User"
import { Random } from "@/Vendor/Helpers"
import { AuthConfig } from "@/Application/Config"

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
}
