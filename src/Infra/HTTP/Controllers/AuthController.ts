import { Context } from "@/Infra/HTTP/Server"
import { validate } from "@/Application/Helpers"
import { AuthService } from "@/Domain/ModelServices"
import { AuthConfig } from "@/Application/Config"

/**
 *  log-in a registered user
 * 
*/
async function Login(ctx: Context) {
  const body = validate(ctx.request.body, {
    email: "email|string",
    password: `string|min:${AuthConfig.passwords.min_length}|required`,
  })

  const result = await AuthService.login(body)

  ctx.body = Object.assign(
    {},
    result.user.toObject(),
    {
      token: result.token,
      password: undefined
    }
  )
}

/** 
 *  logout a logged-in user
 * 
*/
async function Logout(ctx: Context) {
  const user = ctx.state["user"]
  const { token } = ctx.request

  await AuthService.logout(user, token)
  ctx.body = {
    message: "user logged-out successfully"
  }
}

export default {
  Login,
  Logout,
}