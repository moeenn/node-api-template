import { UserService } from "@/app/domain/user"
import { LoginRequest, SetFirstPasswordRequest } from "./Auth.schema"
import { BadRequestException, AuthException } from "@/core/exceptions"
import { User } from "@/app/domain/user"
import { AuthService } from "./Auth.service"
import { Password } from "@/core/helpers"

export const AuthController = {
  /**
   * login an existing user into the system
   *
   */
  async login(args: LoginRequest): Promise<{ user: User; token: string }> {
    const user = await UserService.getUserByEmail(args.email)
    if (!user) {
      throw AuthException("invalid email or password")
    }

    if (!user.password) {
      throw BadRequestException("user account not configured")
    }

    /* only allow approved users to login */
    if (!user.approved) {
      throw AuthException(
        "user account has been disabled by system administrators",
      )
    }

    const isValid = await Password.verify(user.password.hash, args.password)
    if (!isValid) {
      throw AuthException("invalid email or password")
    }

    const token = await AuthService.generateLoginAuthToken(user.id, user.role)
    return {
      user: Object.assign(user, { password: undefined }),
      token,
    }
  },

  /**
   * before a user sets their first password, their password field will be
   * empty
   */
  async setFirstPassword(args: SetFirstPasswordRequest) {
    const userID = await AuthService.validateFirstPasswordToken(
      args.passwordToken,
    )

    const user = await UserService.getUserByIDWithPassword(userID)
    await UserService.setUserPassword(user, args.password)
  },
}
