import { Container } from "typedi"
import { RouteOptions } from "@/Vendor/Entities/Server"
import {
  ForgetPasswordController,
  RequestPasswordResetSchema,
  IRequestPasswordReset,
} from "@/Domain/ForgetPassword"
import { BadRequestException } from "@/Vendor/Exceptions"

export const RequestPasswordReset: RouteOptions = {
  url: "/forget-password/request-reset",
  method: "POST",
  schema: {
    body: RequestPasswordResetSchema,
  },
  handler: async (req) => {
    /**
     *  if a user is already logged-in, they should not be able to reset
     *  their account password through this end-point
     */
    const userID = req.requestContext.get("user_id")
    if (userID) {
      throw BadRequestException("please update the password using setting menu")
    }

    const res = {
      message: "password reset request will be processed",
    }

    const forgetPasswordController = Container.get(ForgetPasswordController)

    /**
     *  we don't want to expose actual internal detail over this end-point.
     *  it must always return a very generic response to user
     */
    try {
      await forgetPasswordController.requestPasswordReset(
        req.body as IRequestPasswordReset,
      )
    } catch (_) {
      return res
    }

    return res
  },
}
