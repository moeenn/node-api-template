import { RouteOptions } from "@/core/server"
import { AuthController } from "./Auth.controller"
import {
  LoginRequestSchema,
  LoginRequest,
  SetFirstPasswordRequest,
  SetFirstPasswordRequestSchema,
} from "./Auth.schema"
import { BadRequestException } from "@/core/exceptions"

const login: RouteOptions = {
  url: "/login",
  method: "POST",
  schema: {
    body: LoginRequestSchema,
  },
  config: {
    rateLimit: {
      max: 5,
      timeWindow: 1000 * 60 /* 1 minute */,
    },
  },
  handler: async (req) => {
    const res = await AuthController.login(req.body as LoginRequest)

    return {
      message: "user logged-in successfully",
      ...res,
    }
  },
}

const setFirstPassword: RouteOptions = {
  url: "/users/set-password",
  method: "POST",
  schema: {
    body: SetFirstPasswordRequestSchema,
  },
  handler: async (req) => {
    const body = req.body as SetFirstPasswordRequest

    if (body.password != body.confirmPassword) {
      throw BadRequestException("password confirmation failed")
    }

    await AuthController.setFirstPassword(body)

    return {
      message: "password set successfully",
    }
  },
}

export const AuthRoutes = [login, setFirstPassword]
