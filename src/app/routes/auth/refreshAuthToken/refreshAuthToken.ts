import { db } from "@/core/database"
import { AuthException } from "@/core/exceptions"
import { validateToken } from "@/core/server/middleware/validateToken"
import { requestMeta, Auth } from "@/core/helpers"
import { RouteOptions } from "fastify"

export const refreshAuthToken: RouteOptions = {
  url: "/auth/refresh-token",
  method: "GET",
  preValidation: [validateToken],
  handler: async (req) => {
    const { userId } = requestMeta(req)
    const error = "Cannot refresh auth token"

    const user = await db.user.findUnique({ where: { id: userId } })
    if (!user) {
      throw AuthException(error, {
        userId,
        message: "trying to refresh auth token for non-existent user",
      })
    }

    if (!user.approved) {
      throw AuthException(error, {
        userId,
        message: "disabled user tried to refresh auth token",
      })
    }

    const token = await Auth.generateLoginAuthToken(user.id, user.role)
    return token
  },
}
