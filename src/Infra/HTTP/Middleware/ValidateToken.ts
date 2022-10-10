import { Request, Reply, Done } from "@/Infra/HTTP/Server"
import { AuthTokenService } from "@/Domain/Models"

export const ValidateToken = async (
  req: Request,
  _reply: Reply,
  done: Done,
) => {
  const token = req.requestContext.get("token")
  const authToken = await AuthTokenService.validateAuthToken(token)

  /** store id of the validated user on the request object */
  req.requestContext.set("user", { _id: authToken.user })
  done()
}
