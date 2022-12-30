import { RouteOptions } from "@/vendor/entities/server"
import { BadRequestException } from "@/vendor/exceptions"
import {
  forgetPasswordController,
  ResetForgottenPasswordSchema,
  IResetForgottenPassword,
} from "@/domain/forgetPassword"

export const resetForgottenPassword: RouteOptions = {
  url: "/forget-password/reset",
  method: "POST",
  schema: {
    body: ResetForgottenPasswordSchema,
  },
  handler: async (req) => {
    const body = req.body as IResetForgottenPassword

    if (body.password !== body.confirm_password) {
      throw BadRequestException("password confirmation failed")
    }

    await forgetPasswordController.resetForgottenPassword(body)

    return {
      message: "password has been updated successfully",
    }
  },
}
