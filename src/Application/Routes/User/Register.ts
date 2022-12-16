import { Container } from "typedi"
import { RouteOptions } from "@/Vendor/Entities/Server"
import {
  UserController,
  RegisterUserSchema,
  IRegisterUser,
} from "@/Domain/User"

export const Register: RouteOptions = {
  url: "/users/register",
  method: "POST",
  schema: {
    body: RegisterUserSchema,
  },
  handler: async (req) => {
    const controller = Container.get(UserController)

    /* TODO: send email to user with instructions to set a password */
    const user = await controller.registerUser(req.body as IRegisterUser)

    return {
      message: "user registered successfully",
      user,
    }
  },
}
