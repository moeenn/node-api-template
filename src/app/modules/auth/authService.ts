import { AuthException, BadRequestException } from "@/core/entities/exceptions"
import { UserRepository } from "@/app/modules/user/userRepository"
import { Login, LoginResult } from "./authSchema"
import { Auth, Password } from "@/core/helpers"

export const AuthService = {
  async login(args: Login): Promise<LoginResult> {
    const user = await UserRepository.findByEmailWithPassword(args.email)
    if (!user)
      throw AuthException("invalid email or password", {
        email: args.email,
        message: "login against non-existent user",
      })

    if (!user.password)
      throw BadRequestException("account not configured", {
        email: args.email,
        message: "failed login against non-configured account",
      })

    if (!user.approved)
      throw BadRequestException("user account disabled by admin", {
        email: args.email,
        message: "failed login against disabled account",
      })

    /** validate the actual password */
    const isValid = await Password.verify(user.password.hash, args.password)
    if (!isValid)
      throw AuthException("invalid email or password", {
        email: args.email,
        message: "invalid login password",
      })

    const token = await Auth.generateLoginAuthToken(user.id, user.role)
    return {
      user: Object.assign(user, { password: undefined }),
      auth: token,
    }
  },

  async refreshAuthToken(userId: number): Promise<LoginResult["auth"]> {
    const error = "Cannot refresh auth token"

    const user = await UserRepository.findById(userId)
    if (!user) {
      throw AuthException(error, {
        userId,
        message: "trying to refresh auth token for non-existent user",
      })
    }

    if (!user.approved) {
      throw AuthException(error, {
        userId,
        message: "disabled user tried to refresh auth token",
      })
    }

    return await Auth.generateLoginAuthToken(user.id, user.role)
  },
}
