import { Context } from "@/Infra/HTTP/Server"
import { validate } from "@/Application/Helpers"
import { AuthService } from "@/Domain/ModelServices"
import { AuthConfig } from "@/Application/Config"
import { z } from "@/Application/Helpers/Validator"

/**
 *  log-in a registered user
 * 
*/
async function Login(ctx: Context) {
  const body = validate(
    ctx.request.body,
    z.object(
      {
        email: z.string().email(),
        password: z.string().min(AuthConfig.passwords.min_length),
      }
    )
  )

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
  const header = validate(
    { token: ctx.request.token },
    z.object(
      {
        token: z.string()
      }
    )
  )

  await AuthService.logout(user, header.token)
  ctx.body = {
    message: "user logged-out successfully"
  }
}

export default {
  Login,
  Logout,
}