import { Context, Next, Middleware } from "@/Core/Server"
import { IUserRole } from "@/Models"
 
function HasRole(roles: IUserRole[]): Middleware {
  return async (ctx: Context, next: Next) => {
    const user = ctx.state["user"]

    const isAuthorized = roles.includes(user.user_role)
    if (!isAuthorized) {
      return ctx.throw(401)
    }

    await next()
  }
}

export default HasRole