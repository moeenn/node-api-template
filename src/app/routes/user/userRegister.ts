import { RouteOptions } from "@/vendor/entities/server"
import { validateToken, hasRole } from "@/vendor/middleware"
import {
  userController,
  RegisterUserSchema,
  IRegisterUser,
} from "@/domain/user"

export const userRegister: RouteOptions = {
  url: "/users/register",
  method: "POST",
  preValidation: [validateToken, hasRole("admin")],
  schema: {
    body: RegisterUserSchema,
  },
  handler: async (req) => {
    /* TODO: send email to user with instructions to set a password */
    const user = await userController.registerUser(req.body as IRegisterUser)

    return {
      message: "user registered successfully",
      user,
    }
  },
}
