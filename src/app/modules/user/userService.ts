import { User, UserRole } from "@prisma/client"
import { UserRepository } from "./userRepository"
import { AuthException, BadRequestException } from "@/core/entities/exceptions"
import { CreateUser, SetUserStatus, UpdateUserProfile } from "./user.schema"
import { Auth } from "@/core/helpers"
import { SetFirstPasswordEmail } from "@/app/emails/setFirstPasswordEmail"
import { EmailService } from "@/core/email"
import { logger } from "@/core/server/logger"

export const UserService = {
  async getUserProfile(userId: number): Promise<User | null> {
    const user = await UserRepository.findById(userId)
    if (!user) {
      throw AuthException("cannot view profile", {
        userId,
        message: "non-existent user id in json token",
      })
    }
    return user
  },

  async registerUser(args: CreateUser): Promise<User> {
    /** email address must must be unique */
    const isEmailTaken = await UserRepository.findByEmail(args.email)
    if (isEmailTaken) {
      throw BadRequestException("email address already in use", {
        email: args.email,
        message: "registration request against existing email address",
      })
    }

    if (args.password !== args.confirmPassword) {
      throw BadRequestException("password confirmation failed", {
        error: "password confirmation failed during user registration",
      })
    }

    const user = await UserRepository.createUser(args, UserRole.USER)
    const token = await Auth.generateFirstPasswordToken(user.id)
    const email = new SetFirstPasswordEmail({ passwordToken: token.token })

    /** don't await, send in the background */
    /** TODO: use pub/sub mechanism */
    EmailService.instance.sendEmail(user.email, email)
    logger.info(
      { email: args.email },
      "sending email for setting first password",
    )

    return user
  },

  async setUserStatus(args: SetUserStatus): Promise<boolean> {
    const user = await UserRepository.findById(args.userId)
    if (!user) {
      throw BadRequestException("invalid user id", {
        userId: args.userId,
        message: "request to set account status for non-existent user",
      })
    }

    await UserRepository.updateUserStatus(user, args.status)
    return args.status
  },

  async updateUserProfile(
    userId: number,
    args: UpdateUserProfile,
  ): Promise<User> {
    const user = await UserRepository.findById(userId)
    if (!user) {
      throw AuthException("cannot update user profile", {
        userId,
        message: "non-existent user in json token",
      })
    }

    return await UserRepository.updateUserProfile(user, args)
  },
}
