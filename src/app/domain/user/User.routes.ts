import { RouteOptions } from "@/core/server"
import { validateToken, hasRole } from "@/core/server/middleware"
import { UserRole } from "@prisma/client"
import { UserController } from "./User.controller"
import {
  ApproveDisapproveUserRequestSchema,
  ApproveDisapproveUserRequest,
  RemoveUserRequest,
  RemoveUserRequestSchema,
  UpdatePasswordRequest,
  UpdatePasswordRequestSchema,
  UpdateProfileRequest,
  UpdateProfileRequestSchema,
  CreateSiteUserRequest,
  CreateSiteUserRequestSchema,
} from "./User.schema"

const getUserProfile: RouteOptions = {
  url: "/user",
  method: "GET",
  preValidation: [validateToken],
  handler: async (req) => {
    const userID = req.requestContext.get("userId")
    return await UserController.getUser(userID)
  },
}

const listAllUsers: RouteOptions = {
  url: "/users/all",
  method: "GET",
  preValidation: [validateToken, hasRole(UserRole.ADMIN)],
  handler: async () => {
    return await UserController.listAllUsers()
  },
}

const createSiteUser: RouteOptions = {
  url: "/users/site/register",
  method: "POST",
  preValidation: [validateToken, hasRole(UserRole.SITE_MANAGER)],
  schema: {
    body: CreateSiteUserRequestSchema,
  },
  handler: async (req) => {
    const body = req.body as CreateSiteUserRequest
    const siteManagerId = req.requestContext.get("userId")

    const user = await UserController.createSiteUser(siteManagerId, body)
    return {
      message: "user registered successfully",
      user,
    }
  },
}

const approveDisapproveUser: RouteOptions = {
  url: "/user/set-approval-status",
  method: "POST",
  preValidation: [validateToken, hasRole(UserRole.ADMIN)],
  schema: {
    body: ApproveDisapproveUserRequestSchema,
  },
  handler: async (req) => {
    const currentUserID = req.requestContext.get("userId")

    const body = req.body as ApproveDisapproveUserRequest
    await UserController.approveDisapproveUser(currentUserID, body)

    return {
      message: "user account approval status updated successfully",
    }
  },
}

const removeUser: RouteOptions = {
  url: "/users/remove",
  method: "POST",
  preValidation: [validateToken, hasRole(UserRole.ADMIN)],
  schema: {
    body: RemoveUserRequestSchema,
  },
  handler: async (req) => {
    const body = req.body as RemoveUserRequest
    await UserController.removeUser(body)

    return {
      message: "user removed successfully",
    }
  },
}

const updatePassword: RouteOptions = {
  url: "/user/password/update",
  method: "POST",
  preValidation: [validateToken],
  schema: {
    body: UpdatePasswordRequestSchema,
  },
  handler: async (req) => {
    const body = req.body as UpdatePasswordRequest
    const userID = req.requestContext.get("userId")

    await UserController.updatePassword(userID, body)
    return {
      message: "account password updated successfully",
    }
  },
}

const updateProfile: RouteOptions = {
  url: "/user/profile/update",
  method: "POST",
  preValidation: [validateToken],
  schema: {
    body: UpdateProfileRequestSchema,
  },
  handler: async (req) => {
    const body = req.body as UpdateProfileRequest
    const userID = req.requestContext.get("userId")

    const updatedUser = await UserController.updateProfile(userID, body)

    return {
      message: "user profile updated successfully",
      user: updatedUser,
    }
  },
}

export const UserRoutes: RouteOptions[] = [
  approveDisapproveUser,
  getUserProfile,
  listAllUsers,
  removeUser,
  updatePassword,
  updateProfile,
  createSiteUser,
]
