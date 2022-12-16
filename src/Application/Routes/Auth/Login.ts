import { Container } from "typedi"
import { RouteOptions } from "@/Vendor/Entities/Server"
import { AuthController, LoginSchema, ILogin } from "@/Domain/Auth"

export const Login: RouteOptions = {
  url: "/users/login",
  method: "POST",
  schema: {
    body: LoginSchema,
  },
  handler: async (req) => {
    const authController = Container.get(AuthController)
    const res = await authController.login(req.body as ILogin)

    return {
      message: "user logged-in successfully",
      ...res,
    }
  },
}
