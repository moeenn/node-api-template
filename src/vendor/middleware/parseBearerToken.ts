import { Request } from "@/vendor/entities/server"
import { AuthException } from "@/vendor/exceptions"

export const parseBearerToken = async (req: Request) => {
  const header = req.headers["authorization"]

  if (!header) {
    throw AuthException("please provide bearer token")
  }

  const token = header.replace("Bearer ", "")
  if (!token) {
    throw AuthException("invalid bearer token")
  }

  req.requestContext.set("token", token)
}
