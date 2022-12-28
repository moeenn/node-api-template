import { Request, Reply, Done } from "@/Vendor/Entities/Server"
import { Container } from "typedi"
import { AuthTokenService } from "@/Domain/AuthToken"

export const ValidateToken = async (
  req: Request,
  _reply: Reply,
  done: Done,
) => {
  const authTokenService = Container.get(AuthTokenService)

  const token = req.requestContext.get("token")
  const authToken = await authTokenService.validateToken(token)
  const roleSlugs = authToken.user.roles.map((role) => role.role.slug)

  /** store id of the validated user on the request object */
  req.requestContext.set("user_id", authToken.user.id)
  req.requestContext.set("user_roles", roleSlugs)
  done()
}
