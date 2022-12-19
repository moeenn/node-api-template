import { Container } from "typedi"
import { RouteOptions } from "@/Vendor/Entities/Server"
import { ParseBearerToken, ValidateToken } from "@/Vendor/Middleware"
import { UserController } from "@/Domain/User"

export const GetUserProfile: RouteOptions = {
  url: "/user",
  method: "GET",
  preValidation: [ParseBearerToken, ValidateToken],
  handler: async (req) => {
    const userID = req.requestContext.get("user_id")

    const userController = Container.get(UserController)
    const user = await userController.getUser(userID)

    return {
      user,
    }
  },
}
