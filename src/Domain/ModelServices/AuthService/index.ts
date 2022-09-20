import { User, IUser, AuthToken, IAuthToken, PasswordReset } from "@/Domain/Models"
import { Password, Random } from "@/Application/Helpers"
import { Exception } from "@/Application/Classes"
import { AuthConfig } from "@/Application/Config"
import { ILoginData, ILoginResult, IResetPasswordData } from "./index.types"

/**
 *  check if an auth bearer token is valid or not
 *  if valid, return the user to it belongs
 * 
 *  TODO: move to AuthToken actions 
*/
async function validateAuthToken(token: string): Promise<IAuthToken> {
  const authToken = await AuthToken
    .repo
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
    .repo
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
  const authToken = new AuthToken.repo({ user, token }) // TODO: move to AuthToken actions
  await authToken.save()

  return { user, token }
}

/**
 *  logout an already logged-in user
 *  TODO: move to AuthToken actions
*/
async function logout(user: IUser, token: string) {
  const authToken = await AuthToken.repo.findOne({ user, token })
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
  const user = await User.repo.findOne({ email })
  if (!user) {
    throw new Exception("user not found", 404, { email })
  }

  const token = Random.string(AuthConfig.tokens.length)

  /**
   *  TODO: move to PasswordReset actions
  */
  const reset = new PasswordReset.repo({ user, token })
  await reset.save()

  return token
}

/**
 *  reset a forgotten password
 *  TODO: move to PasswordReset actions
*/
async function resetPassword(data: IResetPasswordData) {
  const reset = await PasswordReset
    .repo
    .findOne({ token: data.token })
    .populate("user")

  if (!reset || !reset.user) {
    throw new Exception("invalid reset token", 400)
  }

  reset.user.password = await Password.hash(data.password)
  await reset.user.save()

  await PasswordReset
    .repo
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