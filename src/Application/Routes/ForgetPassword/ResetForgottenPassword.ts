import { Container } from "typedi"
import { RouteOptions } from "@/Vendor/Entities/Server"
import { BadRequestException } from "@/Vendor/Exceptions"
import {
  ForgetPasswordController,
  ResetForgottenPasswordSchema,
  IResetForgottenPassword,
} from "@/Domain/ForgetPassword"

export const ResetForgottenPassword: RouteOptions = {
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

    const forgetPasswordController = Container.get(ForgetPasswordController)
    await forgetPasswordController.resetForgottenPassword(body)

    return {
      message: "password has been updated successfully",
    }
  },
}
