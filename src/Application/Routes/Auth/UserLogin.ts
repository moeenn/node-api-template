import { Container } from "typedi"
import { RouteOptions } from "@/Vendor/Entities/Server"
import { AuthController, LoginSchema, ILogin } from "@/Domain/Auth"

export const UserLogin: RouteOptions = {
  url: "/users/login",
  method: "POST",
  schema: {
    body: LoginSchema,
  },
  config: {
    rateLimit: {
      max: 5,
      timeWindow: 1000 * 60 /* 1 minute */,
    },
  },
  handler: async (req) => {
    const authController = Container.get(AuthController)
    const res = await authController.login(req.body as ILogin, false)

    return {
      message: "user logged-in successfully",
      ...res,
    }
  },
}
