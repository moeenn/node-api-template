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

  /** store id of the validated user on the request object */
  req.requestContext.set("user", authToken.user)
  done()
}
