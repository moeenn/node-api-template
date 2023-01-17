import { Request } from "@/vendor/entities/server"
import { JWT, env } from "@/vendor/helpers"
import { userService } from "@/domain/user"
import { AuthException } from "@/vendor/exceptions"

export const validateToken = async (req: Request) => {
  const token = parseBearerToken(req)
  if (!token) {
    throw AuthException("invalid bearer token")
  }

  const jwtPayload = await JWT.validate(env("JWT_SECRET"), token)
  if (!jwtPayload) {
    throw AuthException("invalid bearer token")
  }

  const result = jwtPayload as { userID: number }
  if (!result.userID) {
    throw AuthException("invalid bearer token")
  }

  const user = await userService.getUserByID(result.userID)
  const roleSlugs = user.roles.map((role) => role.role.slug)

  /* store id of the validated user on the request object */
  req.requestContext.set("token", token)
  req.requestContext.set("user_id", user.id)
  req.requestContext.set("user_roles", roleSlugs)
}

function parseBearerToken(req: Request): string | undefined {
  const header = req.headers["authorization"]
  if (!header) return

  const token = header.replace("Bearer ", "")
  if (!token) return

  return token
}
