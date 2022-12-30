import { RouteOptions } from "@/vendor/entities/server"
import { authController, LoginSchema, ILogin } from "@/domain/auth"

export const userLogin: RouteOptions = {
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
    const res = await authController.login(req.body as ILogin, false)

    return {
      message: "user logged-in successfully",
      ...res,
    }
  },
}
