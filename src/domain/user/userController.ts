import { UserWithoutPassword, userService, UserWithRelations } from "."
import { roleService } from "@/domain/role"
import {
  IApproveDisapproveUser,
  IRegisterUser,
  IRemoveUser,
} from "./userController.schema"
import { BadRequestException } from "@/vendor/exceptions"
import { authConfig } from "@/app/config"
import { JWT, env } from "@/vendor/helpers"

/**
 *  register a new user with the system with provided roles and details
 *
 */
async function registerUser(args: IRegisterUser): Promise<UserWithRelations> {
  const roles = await roleService.getRolesBySlugs(args.roles)
  const user = await userService.createUser({
    name: args.name,
    email: args.email,
    roles,
  })

  const token = await JWT.generate(
    env("JWT_SECRET"),
    { userID: user.id },
    authConfig.tokensExpiry.firstPassword,
  )

  // TODO: email password token to the user
  // TODO: remove from console
  console.log({ token })

  return user
}

/**
 *  get complete details of a single user, using their id
 *
 */
async function getUser(id: number): Promise<UserWithoutPassword> {
  const user = await userService.getUserByID(id)
  return user
}

/**
 *  approve or disapprove a user's account
 *
 */
async function approveDisapproveUser(
  currentUserID: number,
  args: IApproveDisapproveUser,
) {
  const user = await userService.getUserByID(args.user_id)
  if (user.id === currentUserID) {
    throw BadRequestException("cannot disable own account")
  }

  await userService.approveDisaproveUser(user, args.status)
}

/**
 *  completely remove a user from the system
 *
 */
async function removeUser(args: IRemoveUser) {
  const user = await userService.getUserByIDWithPassword(args.user_id)
  await userService.removeUser(user)
}

export const userController = {
  registerUser,
  getUser,
  approveDisapproveUser,
  removeUser,
}
