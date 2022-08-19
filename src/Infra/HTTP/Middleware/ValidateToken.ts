import { Context, Next } from "@/Infra/HTTP/Server"
import { AuthService } from "@/Domain/ModelServices"

/**
 *  users will provide their auth tokens (issued at login) as bearer tokens
 *  this middleware verifies that the token is valid
*/
async function ValidateToken(ctx: Context, next: Next) {
  const { token } = ctx.request

  let authToken
  try {
    authToken = await AuthService.validateAuthToken(token)
  } catch (err) {
    return ctx.throw(401)
  }

  ctx.state["user"] = authToken.user
  await next()
}

export default ValidateToken