import { RouteOptions } from "@/vendor/entities/server"
import { parseBearerToken, validateToken, hasRole } from "@/vendor/middleware"
import {
  userController,
  ApproveDisapproveUserSchema,
  IApproveDisapproveUser,
} from "@/domain/user"

export const approveDisapproveUser: RouteOptions = {
  url: "/user/set-approval-status",
  method: "POST",
  preValidation: [parseBearerToken, validateToken, hasRole("admin")],
  schema: {
    body: ApproveDisapproveUserSchema,
  },
  handler: async (req) => {
    const currentUserID = req.requestContext.get("user_id")

    const body = req.body as IApproveDisapproveUser
    await userController.approveDisapproveUser(currentUserID, body)

    return {
      message: "user account approval status updated successfully",
    }
  },
}
