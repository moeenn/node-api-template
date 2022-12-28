import { Container } from "typedi"
import { RouteOptions } from "@/Vendor/Entities/Server"
import { AuthController, LoginSchema, ILogin } from "@/Domain/Auth"

export const AdminLogin: RouteOptions = {
  url: "/admin/login",
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

    /* only allow admins to login using this route */
    const res = await authController.login(req.body as ILogin, true)

    return {
      message: "user logged-in successfully",
      ...res,
    }
  },
}
