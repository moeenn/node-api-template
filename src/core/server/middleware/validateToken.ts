import { Request } from "@/core/server"
import { AuthException } from "@/core/exceptions"
import { AuthService } from "@/app/services/AuthService"

export const validateToken = async (req: Request) => {
  const token = parseBearerToken(req)
  if (!token) {
    throw AuthException("invalid bearer token")
  }

  const { userId, userRole } = await AuthService.validateLoginAuthToken(token)

  /* store id of the validated user on the request object */
  req.requestContext.set("token", token)
  req.requestContext.set("userId", userId)
  req.requestContext.set("userRole", userRole)
}

function parseBearerToken(req: Request): string | undefined {
  const header = req.headers["authorization"]
  if (!header) return

  const token = header.replace("Bearer ", "")
  if (!token) return

  return token
}
