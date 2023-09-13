import { UserRepository } from "./userRepository"
import { AuthException, BadRequestException } from "@/core/exceptions"
import { Auth, requestMeta } from "@/core/helpers"
import { validateToken } from "@/core/server/middleware"
import { RouteOptions } from "fastify"
import { hasRole } from "@/core/server/middleware"
import { UserRole } from "@prisma/client"
import { ListUsersQuery, ListUsersQuerySchema, CreateUser, CreateUserSchema, SetUserStatus, SetUserStatusSchema, UpdateUserPasswordSchema, UpdateUserPassword, UpdateUserProfileSchema, UpdateUserProfile } from "./user.schema"
import { SetFirstPasswordEmail } from "@/app/emails"
import { EmailService } from "@/core/email"
import { logger } from "@/core/server/logger"

const getUserProfile: RouteOptions = {
  url: "/user/profile",
  method: "GET",
  preValidation: [validateToken],
  handler: async (req) => {
    const { userId } = requestMeta(req)
    const user = await UserRepository.findById(userId)
    if (!user) {
      throw AuthException("cannot view profile", {
        userId,
        message: "non-existent user id in json token",
      })
    }

    return user
  },
}

const listUsers: RouteOptions = {
  url: "/users",
  method: "GET",
  preValidation: [validateToken, hasRole(UserRole.ADMIN)],
  schema: {
    querystring: ListUsersQuerySchema,
  },
  handler: async (req) => {
    const query = req.query as ListUsersQuery
    const page = query.page ?? 1
    return await UserRepository.listUsers(page, query.query)
  },
}

const registerUser: RouteOptions = {
  url: "/user/register",
  method: "POST",
  schema: {
    body: CreateUserSchema,
  },
  handler: async (req) => {
    const body = req.body as CreateUser

    /** email address must must be unique */
    const isEmailTaken = await UserRepository.findByEmail(body.email)
    if (isEmailTaken) {
      throw BadRequestException("email address already in use", {
        email: body.email,
        message: "registration request against existing email address",
      })
    }

    if (body.password !== body.confirmPassword) {
      throw BadRequestException("password confirmation failed", {
        error: "password confirmation failed during user registration",
      })
    }

    const user = await UserRepository.createUser(body, UserRole.USER)
    const token = await Auth.generateFirstPasswordToken(user.id)
    const email = new SetFirstPasswordEmail({ passwordToken: token.token })

    /** don't await, send in the background */
    EmailService.instance().sendEmail(user.email, email)
    logger.info(
      { email: body.email },
      "sending email for setting first password",
    )

    return {
      message: "user registered successfully",
    }
  },
}

const setUserStatus: RouteOptions = {
  url: "/user/set-status",
  method: "POST",
  preValidation: [validateToken, hasRole(UserRole.ADMIN)],
  schema: {
    body: SetUserStatusSchema,
  },
  handler: async (req) => {
    const body = req.body as SetUserStatus

    const user = await UserRepository.findById(body.userId)
    if (!user) {
      throw BadRequestException("invalid user id", {
        userId: body.userId,
        message: "request to set account status for non-existent user",
      })
    }

    await UserRepository.updateUserStatus(user, body.status)
    return {
      message: "user account status updated successfully",
      updatedStatus: body.status,
    }
  },
}

const updateUserPassword: RouteOptions = {
  url: "/user/update-password",
  method: "POST",
  preValidation: [validateToken],
  schema: {
    body: UpdateUserPasswordSchema,
  },
  handler: async (req) => {
    const body = req.body as UpdateUserPassword
    const { userId } = requestMeta(req)

    if (body.password !== body.confirmPassword) {
      throw BadRequestException("password confirmation failed")
    }

    const user = await UserRepository.findById(userId)
    if (!user) {
      throw AuthException("cannot update user password", {
        userId,
        message: "non-existent user id in json token",
      })
    }

    await UserRepository.updateUserPassword(user, body.password)
    return {
      message: "account password updated successfully",
    }
  },
}

const updateUserProfile: RouteOptions = {
  url: "/api/user/profile",
  method: "PUT",
  preValidation: [validateToken],
  schema: {
    body: UpdateUserProfileSchema,
  },
  handler: async (req) => {
    const body = req.body as UpdateUserProfile
    const { userId } = requestMeta(req)

    const user = await UserRepository.findById(userId)
    if (!user) {
      throw AuthException("cannot update user profile", {
        userId,
        message: "non-existent user in json token",
      })
    }

    const updatedUser = await UserRepository.updateUserProfile(user, body)
    return {
      message: "user profile updated successfully",
      profile: updatedUser,
    }
  },
}

export const UserController = {
  getUserProfile,
  listUsers,
  registerUser,
  setUserStatus,
  updateUserPassword,
  updateUserProfile,
}