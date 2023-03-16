import { database } from "@/core/database"
import { AuthException } from "@/core/exceptions"
import { logger } from "@/core/server/logger"
import { validateToken } from "@/core/server/middleware"
import { RouteOptions } from "fastify"

export const getUserProfile: RouteOptions = {
  url: "/user/profile",
  method: "GET",
  preValidation: [validateToken],
  handler: async (req) => {
    const userId = req.requestContext.get("userId")
    const user = await database.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      logger.error({ userId }, "non-existent user id in json token")
      throw AuthException("cannot view profile")
    }

    return user
  },
}
