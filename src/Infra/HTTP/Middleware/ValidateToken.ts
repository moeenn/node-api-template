import { Context, Next } from "@/Infra/HTTP/Server"
import { AuthToken } from "@/Domain/Models"
import { Exception } from "@/Application/Exceptions"

/**
 *  users will provide their auth tokens (issued at login) as bearer tokens
 *  this middleware verifies that the token is valid
 */
export async function ValidateToken(ctx: Context, next: Next) {
  const { token } = ctx.request
  if (!token) {
    throw new Exception("please provide a bearer token", 401)
  }

  const authToken = await AuthToken.actions.validateAuthToken(token)
  ctx.state["user"] = authToken.user

  await next()
}
