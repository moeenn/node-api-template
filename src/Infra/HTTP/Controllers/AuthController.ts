import { Context } from "@/Infra/HTTP/Server"
import { validate } from "@/Application/Helpers"
import { AuthConfig } from "@/Application/Config"
import { AuthService } from "@/Domain/ModelServices"

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
  Login,
  Logout,
}