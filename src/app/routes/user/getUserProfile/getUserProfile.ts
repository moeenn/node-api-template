import { db } from "@/core/database"
import { AuthException } from "@/core/exceptions"
import { requestMeta } from "@/core/helpers"
import { validateToken } from "@/core/server/middleware"
import { RouteOptions } from "fastify"

export const getUserProfile: RouteOptions = {
  url: "/user/profile",
  method: "GET",
  preValidation: [validateToken],
  handler: async (req) => {
    const { userId } = requestMeta(req)
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      throw AuthException("cannot view profile", {
        userId,
        message: "non-existent user id in json token",
      })
    }

    return user
  },
}
