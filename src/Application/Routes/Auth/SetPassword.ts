import { Container } from "typedi"
import { RouteOptions } from "@/Vendor/Entities/Server"
import { BadRequestException } from "@/Vendor/Exceptions"
import {
  AuthController,
  SetFirstPasswordSchema,
  ISetFirstPassword,
} from "@/Domain/Auth"

export const SetPassword: RouteOptions = {
  url: "/users/set-password",
  method: "POST",
  schema: {
    body: SetFirstPasswordSchema,
  },
  handler: async (req) => {
    const body = req.body as ISetFirstPassword

    if (body.password != body.confirm_password) {
      throw BadRequestException("password confirmation failed")
    }

    const authController = Container.get(AuthController)
    await authController.setFirstPassword(body)

    return {
      message: "password set successfully",
    }
  },
}
