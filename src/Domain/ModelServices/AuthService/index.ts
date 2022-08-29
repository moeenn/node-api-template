import { User, IUser, AuthToken, IAuthToken, PasswordReset } from "@/Domain/Models"
import { Password, Random } from "@/Application/Helpers"
import { Exception } from "@/Application/Classes"
import { AuthConfig } from "@/Application/Config"
import { ILoginData, ILoginResult, IResetPasswordData } from "./index.types"

/**
 *  check if an auth bearer token is valid or not
 *  if valid, return the user to it belongs
 * 
*/
async function validateAuthToken(token: string): Promise<IAuthToken> {
  const authToken = await AuthToken
    .findOne({ token })
    .populate("user")

  if (!authToken || !authToken.user) {
    throw new Exception("invalid auth bearer token", 401)
  }

  return authToken
}

/**
 *  attempt user login
 * 
*/
async function login(data: ILoginData): Promise<ILoginResult> {
  const user = await User
    .findOne({ email: data.email })
    .select("+password")
    .populate("profile.avatar")

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
  const authToken = new AuthToken({ user, token })
  await authToken.save()

  return { user, token }
}

/**
 *  logout an already logged-in user
 * 
*/
async function logout(user: IUser, token: string) {
  const authToken = await AuthToken.findOne({ user, token })
  if (!authToken) {
    throw new Exception("invalid auth bearer token", 401)
  }

  await authToken.delete()
}

/**
 *  request a user account password reset
 * 
*/
async function requestPasswordReset(email: string): Promise<string> {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Exception("user not found", 404, { email })
  }

  const token = Random.string(AuthConfig.tokens.length)
  const reset = new PasswordReset({ user, token })
  await reset.save()

  return token
}

/**
 *  reset a forgotten password
 * 
*/
async function resetPassword(data: IResetPasswordData) {
  const reset = await PasswordReset
    .findOne({ token: data.token })
    .populate("user")

  if (!reset || !reset.user) {
    throw new Exception("invalid reset token", 400)
  }

  reset.user.password = await Password.hash(data.password)
  await reset.user.save()

  await PasswordReset
    .find({ user: reset.user })
    .deleteMany()
    .exec()
}

export default {
  validateAuthToken,
  login,
  logout,
  requestPasswordReset,
  resetPassword,
}