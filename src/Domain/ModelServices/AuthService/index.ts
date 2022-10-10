import { User, IDocumentUser, AuthToken, PasswordReset } from "@/Domain/Models"
import { Password, Random } from "@/Application/Helpers"
import { Exception } from "@/Application/Exceptions"
import { AuthConfig } from "@/Application/Config"
import { ILoginData, ILoginResult } from "./index.types"

/**
 *  attempt user login
 *
 */
async function login(data: ILoginData): Promise<ILoginResult> {
  const user = await User.repo
    .findOne({ email: data.email })
    .select("+password")
  // .populate("profile.avatar")

  if (!user) {
    throw new Exception("invalid email or password", 401)
  }

  if (!user.approved) {
    throw new Exception("account has been disabled by the admin", 401, {
      user_id: user._id,
    })
  }

  const verified = await Password.verify(user.password, data.password)
  if (!verified) {
    throw new Exception("invalid email or password", 401)
  }

  const token = Random.string(AuthConfig.tokens.length)
  await AuthToken.actions.createAuthToken(user, token)

  return { user, token }
}

/**
 *  logout an already logged-in user
 *
 */
async function logout(token: string) {
  await AuthToken.actions.deleteAuthToken(token)
}

/**
 *  request a user account password reset
 *
 */
async function requestPasswordReset(email: string): Promise<string> {
  const user = await User.repo.findOne({ email })
  if (!user) {
    throw new Exception("user not found", 404, { email })
  }

  const token = Random.string(AuthConfig.tokens.length)
  await PasswordReset.actions.createPasswordResetToken(user, token)

  return token
}

export const AuthService = {
  login,
  logout,
  requestPasswordReset,
}
