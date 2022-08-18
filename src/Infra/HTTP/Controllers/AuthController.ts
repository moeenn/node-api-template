import { Context } from "@/Infra/HTTP/Server"
import { validate } from "@/Application/Helpers"
import { AuthConfig } from "@/Application/Config"
import { UserService, AuthService } from "@/Domain/ModelServices"

/**
 *  register a new user
 *  TODO: move to user controller 
*/
async function Register(ctx: Context) {
  const body = validate(ctx.request.body, {
    email: "email|required",
    password: `string|min:${AuthConfig.passwords.min_length}|required`,
    confirm_password: "same:password|required",
  })

  const user = await UserService.createUser({
    ...body,
    role: "client",
  })

  ctx.status = 201
  ctx.body = user.toObject()
}

/**
 *  log-in a registered user
 * 
*/
async function Login(ctx: Context) {
  const body = validate(ctx.request.body, {
    email: "email|required",
    password: `string|min:${AuthConfig.passwords.min_length}|required`,
  })

  const result = await AuthService.login(body)
  ctx.body = { 
    ...result.user.toObject(), 
    token: result.token 
  }
}

/** 
 *  logout a logged-in user
 * 
*/
async function Logout(ctx: Context) {
  const user = ctx.state["user"]
  const { token } = ctx.request

  await AuthService.logout(user, token)    
  ctx.body = { message: "user logged-out successfully" }
}

export default {
  Register,
  Login,
  Logout,
}