import { RouteOptions } from "fastify"
import { AuthException, BadRequestException } from "@/core/exceptions"
import { Password, Auth, requestMeta } from "@/core/helpers"
import { Login, LoginSchema, SetFirstPassword, SetFirstPasswordSchema, } from "./auth.schema"
import { UserRepository } from "../user/userRepository"
import { validateToken } from "@/core/server/middleware"

const login: RouteOptions = {
  url: "/login",
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

    const user = await UserRepository.findByEmailWithPassword(body.email)
    if (!user)
      throw AuthException("invalid email or password", {
        email: body.email,
        message: "login against non-existent user",
      })

    if (!user.password)
      throw BadRequestException("account not configured", {
        email: body.email,
        message: "failed login against non-configured account",
      })

    if (!user.approved)
      throw BadRequestException("user account disabled by admin", {
        email: body.email,
        message: "failed login against disabled account",
      })

    /** validate the actual password */
    const isValid = await Password.verify(user.password.hash, body.password)
    if (!isValid)
      throw AuthException("invalid email or password", {
        email: body.email,
        message: "invalid login password",
      })

    const token = await Auth.generateLoginAuthToken(user.id, user.role)
    return {
      user: Object.assign(user, { password: undefined }),
      auth: token,
    }
  },
}

const refreshAuthToken: RouteOptions = {
  url: "/auth/refresh-token",
  method: "GET",
  preValidation: [validateToken],
  handler: async (req) => {
    const { userId } = requestMeta(req)
    const error = "Cannot refresh auth token"

    const user = await UserRepository.findById(userId)
    if (!user) {
      throw AuthException(error, {
        userId,
        message: "trying to refresh auth token for non-existent user",
      })
    }

    if (!user.approved) {
      throw AuthException(error, {
        userId,
        message: "disabled user tried to refresh auth token",
      })
    }

    const token = await Auth.generateLoginAuthToken(user.id, user.role)
    return token
  },
}

const setFirstPassword: RouteOptions = {
  url: "/user/configure",
  method: "POST",
  schema: {
    body: SetFirstPasswordSchema,
  },
  handler: async (req) => {
    const body = req.body as SetFirstPassword

    if (body.password !== body.confirmPassword) {
      throw BadRequestException("password confirmation failed", {
        message: "password confirmation mismatch when setting first password",
      })
    }

    const userId = await Auth.validateFirstPasswordToken(body.passwordToken)

    const user = await UserRepository.findByIdWithPassword(userId)
    if (!user)
      throw BadRequestException("invalid password token provided", {
        userId,
        message: "non-existent userId in password token",
      })

    if (user.password)
      throw BadRequestException("user account already configured", {
        userId,
        message: "trying to configure already configured account",
      })

    await UserRepository.setUserPassword(user, body.password)
    return {
      message: "account configured successfully",
    }
  },
}

export const AuthController = {
  login,
  refreshAuthToken,
  setFirstPassword,
}