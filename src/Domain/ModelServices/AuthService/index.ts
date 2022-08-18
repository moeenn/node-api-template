import { User, IUser, AuthToken, IAuthToken, PasswordReset } from "@/Domain/Models"
import { Password, Random } from "@/Application/Helpers"
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
    throw new Error("invalid auth bearer token")
  }

  return authToken
}

/**
 *  attempt user login
 * 
*/
async function login(data: ILoginData): Promise<ILoginResult> {
  const user = await User.findOne({ email: data.email }).select("+password")
  if (!user) {
    // TODO: replace with Exception
    throw new Error(`user with email address ${data.email} not found`)
  }

  const verified = await Password.verify(user.password, data.password)
  if (!verified) {
    // TODO: replace with Exception
    throw new Error("invalid password provided")
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
    // TODO: replace with Exception
    throw new Error("invalid auth token")
  }

  await authToken.delete()
}

/**
 *  request a user account password reset
 * 
*/
async function requestPasswordReset(email: string) {
  const user = await User.findOne({ email })
  if (!user) {
    // TODO: replace with Exception
    throw new Error(`no user found against provided email address: ${email}`)
  }

  const token = Random.string(AuthConfig.tokens.length)
  const reset = new PasswordReset({ user, token })
  await reset.save()
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
    // TODO: replace with Exception
    throw new Error("invalid reset token")
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