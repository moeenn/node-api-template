import { Container } from "typedi"
import { RouteOptions } from "@/Vendor/Entities/Server"
import { ParseBearerToken, ValidateToken, HasRole } from "@/Vendor/Middleware"
import {
  UserController,
  ApproveDisapproveUserSchema,
  IApproveDisapproveUser,
} from "@/Domain/User"

export const ApproveDisapproveUser: RouteOptions = {
  url: "/user/set-approval-status",
  method: "POST",
  preValidation: [ParseBearerToken, ValidateToken, HasRole("admin")],
  schema: {
    body: ApproveDisapproveUserSchema,
  },
  handler: async (req) => {
    const userController = Container.get(UserController)
    const currentUserID = req.requestContext.get("user_id")

    const body = req.body as IApproveDisapproveUser
    await userController.approveDisapproveUser(currentUserID, body)

    return {
      message: "user account approval status updated successfully",
    }
  },
}
