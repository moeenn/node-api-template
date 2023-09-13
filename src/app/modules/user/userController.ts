import { UserRepository } from "./userRepository"
import { requestMeta } from "@/core/helpers"
import { validateToken } from "@/core/server/middleware"
import { RouteOptions } from "fastify"
import { hasRole } from "@/core/server/middleware"
import { UserRole } from "@prisma/client"
import {
  ListUsersQuery,
  ListUsersQuerySchema,
  CreateUser,
  CreateUserSchema,
  SetUserStatus,
  SetUserStatusSchema,
  UpdateUserProfileSchema,
  UpdateUserProfile,
} from "./user.schema"
import { UserService } from "./userService"

const getUserProfile: RouteOptions = {
  url: "/user/profile",
  method: "GET",
  preValidation: [validateToken],
  handler: async (req) => {
    const { userId } = requestMeta(req)
    return await UserService.getUserProfile(userId)
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
    await UserService.registerUser(body)
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
    const status = await UserService.setUserStatus(body)
    return {
      message: "user account status updated successfully",
      updatedStatus: status,
    }
  },
}

const updateUserProfile: RouteOptions = {
  url: "/user/profile",
  method: "PUT",
  preValidation: [validateToken],
  schema: {
    body: UpdateUserProfileSchema,
  },
  handler: async (req) => {
    const body = req.body as UpdateUserProfile
    const { userId } = requestMeta(req)
    const updatedUser = await UserService.updateUserProfile(userId, body)
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
  updateUserProfile,
}
