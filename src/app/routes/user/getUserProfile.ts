import { RouteOptions } from "@/vendor/entities/server"
import { parseBearerToken, validateToken } from "@/vendor/middleware"
import { userController } from "@/domain/user"

export const getUserProfile: RouteOptions = {
  url: "/user",
  method: "GET",
  preValidation: [parseBearerToken, validateToken],
  handler: async (req) => {
    const userID = req.requestContext.get("user_id")
    const user = await userController.getUser(userID)

    return {
      user,
    }
  },
}
