import { RouteOptions } from "@/vendor/entities/server"
import { authController } from "@/domain/auth"
import { parseBearerToken, validateToken } from "@/vendor/middleware"

export const logout: RouteOptions = {
  url: "/users/logout",
  method: "GET",
  preValidation: [parseBearerToken, validateToken],
  handler: async (req) => {
    const token = req.requestContext.get("token")
    await authController.logout(token)

    return {
      message: "user logged-out successfully",
    }
  },
}
