import { UserRepository } from "./userRepository"
import { requestMeta } from "@/core/helpers"
import { validateToken } from "@/core/server/middleware"
import { RouteShorthandOptionsWithHandler } from "fastify"
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
} from "./userSchema"
import { UserService } from "./userService"

export const UserController: Record<string, RouteShorthandOptionsWithHandler> =
  {
    getUserProfile: {
      preValidation: [validateToken],
      handler: async (req) => {
        const { userId } = requestMeta(req)
        return await UserService.getUserProfile(userId)
      },
    },

    listUsers: {
      preValidation: [validateToken, hasRole(UserRole.ADMIN)],
      schema: {
        querystring: ListUsersQuerySchema,
      },
      handler: async (req) => {
        const query = req.query as ListUsersQuery
        const page = query.page ?? 1
        return await UserRepository.listUsers(page, query.query)
      },
    },

    registerUser: {
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
    },

    setUserStatus: {
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
    },

    updateUserProfile: {
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
    },
  }
