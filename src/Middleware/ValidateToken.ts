import { Context, Next } from "@/Core/Server"
import { report } from "@/Core/Helpers"
import { AuthToken } from "@/Models/AuthToken" 

async function ValidateToken(ctx: Context, next: Next) {
  const { token } = ctx.request

  const authToken = await AuthToken.findOne({ token }).populate("user")
  if (!authToken) {
    return report(ctx, {}, {}, 401)
  }

  if (!authToken.user) {
    return report(ctx, {}, {}, 401)    
  }

  if (!authToken.user.approved) {
    return report(ctx, {}, {}, 401)    
  }

  ctx.state["user"] = authToken.user.toObject()
  await next()
}

export default ValidateToken