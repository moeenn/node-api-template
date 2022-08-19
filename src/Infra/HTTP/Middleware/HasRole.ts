import { Context, Next, Middleware } from "@/Infra/HTTP/Server"
import { IUserRole } from "@/Domain/Models"
import { Exception } from "@/Application/Classes"

function HasRole(roles: IUserRole[]): Middleware {
  return async (ctx: Context, next: Next) => {
    const user = ctx.state["user"]

    const isAuthorized = roles.includes(user.role)
    if (!isAuthorized) {
      throw new Exception("unauthorized", 401)
    }

    await next()
  }
}

export default HasRole