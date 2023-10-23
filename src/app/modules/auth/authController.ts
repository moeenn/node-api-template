import { RouteShorthandOptionsWithHandler } from "fastify"
import { requestMeta } from "@/core/helpers"
import { Login } from "./authSchema"
import { AuthService } from "./authService"
import { LoginSchema } from "./authSchema"
import { validateToken } from "@/core/server/middleware"

export const AuthController: Record<string, RouteShorthandOptionsWithHandler> =
  {
    login: {
      config: {
        rateLimit: {
          max: 7,
          timeWindow: 1000 * 60 /* 1 minute */,
        },
      },
      schema: {
        body: LoginSchema,
      },
      handler: async (req) => {
        const body = req.body as Login
        return await AuthService.login(body)
      },
    },

    refreshAuthToken: {
      preValidation: [validateToken],
      handler: async (req) => {
        const { userId } = requestMeta(req)
        return await AuthService.refreshAuthToken(userId)
      },
    },
  }
