import { RouteOptions } from "@/vendor/entities/server"
import { parseBearerToken, validateToken, hasRole } from "@/vendor/middleware"
import { userController, RemoveUserSchema, IRemoveUser } from "@/domain/user"

export const removeUser: RouteOptions = {
  url: "/users/remove",
  method: "POST",
  preValidation: [parseBearerToken, validateToken, hasRole("admin")],
  schema: {
    body: RemoveUserSchema,
  },
  handler: async (req) => {
    const body = req.body as IRemoveUser
    await userController.removeUser(body)

    return {
      message: "user removed successfully",
    }
  },
}
