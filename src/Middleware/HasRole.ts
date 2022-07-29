import { Context, Next, Middleware } from "@/Core/Server"
import { IRole } from "@/Models"
 
function HasRole(roles: IRole[]): Middleware {
  return async (ctx: Context, next: Next) => {
    const user = ctx.state["user"]

    const isAuthorized = roles.includes(user.role)
    if (!isAuthorized) {
      return ctx.throw(401)
    }

    await next()
  }
}

export default HasRole