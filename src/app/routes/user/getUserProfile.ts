import { RouteOptions } from "@/vendor/entities/server"
import { validateToken } from "@/vendor/middleware"
import { userController } from "@/domain/user"

export const getUserProfile: RouteOptions = {
  url: "/user",
  method: "GET",
  preValidation: [validateToken],
  handler: async (req) => {
    const userID = req.requestContext.get("user_id")
    const user = await userController.getUser(userID)

    return {
      user,
    }
  },
}
