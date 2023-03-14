import { User, UserService } from "."
import {
  ApproveDisapproveUserRequest,
  CreateSiteUserRequest,
  RemoveUserRequest,
  UpdatePasswordRequest,
  UpdateProfileRequest,
} from "./User.schema"
import { BadRequestException, ValidationException } from "@/core/exceptions"
import { AuthService } from "@/app/domain/auth"
import { SetFirstPasswordEmail } from "@/app/emails"
import { EmailService } from "@/core/email"

export const UserController = {
  /**
   * register a new user with the system with provided roles and details
   *
   */
  async createSiteUser(siteId: number, args: CreateSiteUserRequest): Promise<User> {
    const user = await UserService.createSiteUser({
      name: args.name,
      email: args.email,
      role: args.role,
      siteId: siteId,
    })

    const token = await AuthService.generateFirstPasswordToken(user.id)
    const email = new SetFirstPasswordEmail({ passwordToken: token })

    /* don't await, send in the background */
    EmailService.instance().sendEmail(user.email, email)

    return user
  },

  /**
   * get complete details of a single user, using their id
   *
   */
  async getUser(id: number): Promise<User> {
    const user = await UserService.getUserByID(id)
    return user
  },

  /**
   * list out all users registered in the system
   *
   */
  async listAllUsers(): Promise<User[]> {
    return await UserService.listAllUsers()
  },

  /**
   * approve or disapprove a user's account
   *
   */
  async approveDisapproveUser(
    currentUserID: number,
    args: ApproveDisapproveUserRequest,
  ) {
    const user = await UserService.getUserByID(args.userId)
    if (user.id === currentUserID) {
      throw BadRequestException("cannot disable own account")
    }

    await UserService.approveDisaproveUser(user, args.status)
  },

  /**
   * allow a logged-in user to update their own profile
   *
   */
  async updateProfile(
    userID: number,
    args: UpdateProfileRequest,
  ): Promise<User> {
    const user = await UserService.getUserByID(userID)
    return await UserService.updateProfile(user, args)
  },

  /**
   * allow user to update their account password
   *
   */
  async updatePassword(userID: number, args: UpdatePasswordRequest) {
    if (args.password !== args.confirmPassword) {
      throw ValidationException("password confirmation failed")
    }

    const user = await UserService.getUserByIDWithPassword(userID)
    await UserService.setUserPassword(user, args.password)
  },

  /**
   * completely remove a user from the system
   *
   */
  async removeUser(args: RemoveUserRequest) {
    const user = await UserService.getUserByIDWithPassword(args.userId)
    await UserService.removeUser(user)
  },
}
