import { Context, Next, Middleware } from "@/Infra/HTTP/Server"
import { IUserRole } from "@/Domain/Models"
import { Exception } from "@/Application/Exceptions"

/**
 *  user must be logged-in and must have the appropriate provided role
 */
export function HasRole(...roles: IUserRole[]): Middleware {
  return async (ctx: Context, next: Next) => {
    const user = ctx.state["user"]

    const isAuthorized = roles.includes(user.user_role)
    if (!isAuthorized) {
      throw new Exception("unauthorized", 401, {
        message: `only users with role ${roles.join(
          ", ",
        )} can access this resource`,
      })
    }

    await next()
  }
}
