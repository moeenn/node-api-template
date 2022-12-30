import { Request, Reply, Done } from "@/vendor/entities/server"
import { authTokenService } from "@/domain/authToken"

export const validateToken = async (
  req: Request,
  _reply: Reply,
  done: Done,
) => {
  const token = req.requestContext.get("token")
  const authToken = await authTokenService.validateToken(token)
  const roleSlugs = authToken.user.roles.map((role) => role.role.slug)

  /** store id of the validated user on the request object */
  req.requestContext.set("user_id", authToken.user.id)
  req.requestContext.set("user_roles", roleSlugs)
  done()
}
