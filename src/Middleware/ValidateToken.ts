import { Context, Next } from "@/Core/Server"
import { AuthToken } from "@/Models/AuthToken" 

async function ValidateToken(ctx: Context, next: Next) {
  const { token } = ctx.request

  const authToken = await AuthToken.findOne({ token }).populate("user")
  if (!authToken) {
    return ctx.throw(401)
  }

  if (!authToken.user) {
    return ctx.throw(401)    
  }

  if (!authToken.user.approved) {
    return ctx.throw(401)    
  }

  ctx.state["user"] = authToken.user
  await next()
}

export default ValidateToken