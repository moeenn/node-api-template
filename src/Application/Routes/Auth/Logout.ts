import { Container } from "typedi"
import { RouteOptions } from "@/Vendor/Entities/Server"
import { AuthController } from "@/Domain/Auth"
import { ParseBearerToken, ValidateToken } from "@/Vendor/Middleware"

export const Logout: RouteOptions = {
  url: "/users/logout",
  method: "GET",
  preValidation: [ParseBearerToken, ValidateToken],
  handler: async (req) => {
    const token = req.requestContext.get("token")

    const authController = Container.get(AuthController)
    await authController.logout(token)

    return {
      message: "user logged-out successfully",
    }
  },
}
