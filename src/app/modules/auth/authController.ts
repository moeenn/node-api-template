import { RouteOptions } from "fastify"
import { requestMeta } from "@/core/helpers"
import { Login, LoginSchema } from "./auth.schema"
import { validateToken } from "@/core/server/middleware"
import { AuthService } from "./authService"

const login: RouteOptions = {
  url: "/auth/login",
  method: "POST",
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
}

const refreshAuthToken: RouteOptions = {
  url: "/auth/refresh-token",
  method: "GET",
  preValidation: [validateToken],
  handler: async (req) => {
    const { userId } = requestMeta(req)
    return await AuthService.refreshAuthToken(userId)
  },
}

export const AuthController = {
  login,
  refreshAuthToken,
}
