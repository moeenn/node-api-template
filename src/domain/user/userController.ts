import { User, UserWithoutPassword, userService, UserWithRelations } from "."
import { roleService } from "@/domain/role"
import { passwordTokenService } from "@/domain/passwordToken"
import { IApproveDisapproveUser, IRegisterUser } from "./userController.schema"
import { BadRequestException } from "@/vendor/exceptions"

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

  await passwordTokenService.createToken(user)
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

// TODO: remove user?

export const userController = {
  registerUser,
  getUser,
  approveDisapproveUser,
}
