import { RouteOptions } from "@/vendor/entities/server"
import { BadRequestException } from "@/vendor/exceptions"
import {
  authController,
  SetFirstPasswordSchema,
  ISetFirstPassword,
} from "@/domain/auth"

export const setFirstPassword: RouteOptions = {
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

    await authController.setFirstPassword(body)

    return {
      message: "password set successfully",
    }
  },
}
