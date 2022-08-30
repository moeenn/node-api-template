import { Context, Next } from "@/Infra/HTTP/Server"
import { AuthService } from "@/Domain/ModelServices"
import { Exception } from "@/Application/Classes"

/**
 *  users will provide their auth tokens (issued at login) as bearer tokens
 *  this middleware verifies that the token is valid
*/
async function ValidateToken(ctx: Context, next: Next) {
  const { token } = ctx.request
  if (!token) {
    throw new Exception("please provide a bearer token", 401)
  }

  const authToken = await AuthService.validateAuthToken(token)
  ctx.state["user"] = authToken.user

  await next()
}

export default ValidateToken