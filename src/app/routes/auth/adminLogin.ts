import { RouteOptions } from "@/vendor/entities/server"
import { authController, LoginSchema, ILogin } from "@/domain/auth"

export const adminLogin: RouteOptions = {
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
    /* only allow admins to login using this route */
    const res = await authController.login(req.body as ILogin, true)

    return {
      message: "user logged-in successfully",
      ...res,
    }
  },
}
