import { RouteOptions } from "@/Infra/HTTP/Server"
import { ParseBearerToken, ValidateToken } from "@/Infra/HTTP/Middleware"
import { AuthService } from "@/Domain/ModelServices"

export const Logout: RouteOptions = {
  method: "GET",
  url: "/logout",
  preValidation: [ParseBearerToken, ValidateToken],
  handler: async (req) => {
    const token = req.requestContext.get("token")
    await AuthService.logout(token)

    return {
      message: "user logged-out successfully",
    }
  },
}
