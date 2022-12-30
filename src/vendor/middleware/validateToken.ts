import { Request } from "@/vendor/entities/server"
import { JWT, env } from "@/vendor/helpers"
import { userService } from "@/domain/user"
import { AuthException } from "@/vendor/exceptions"

export const validateToken = async (req: Request) => {
  const token = req.requestContext.get("token")
  const jwtPayload = await JWT.validate(env("JWT_SECRET"), token)
  if (!jwtPayload) {
    throw AuthException("invalid bearer token")
  }

  const { userID } = jwtPayload as { userID: number }
  if (!userID) {
    throw AuthException("invalid bearer token")
  }

  const user = await userService.getUserByID(userID)
  const roleSlugs = user.roles.map((role) => role.role.slug)

  /** store id of the validated user on the request object */
  req.requestContext.set("user_id", user.id)
  req.requestContext.set("user_roles", roleSlugs)

  // done()
}
