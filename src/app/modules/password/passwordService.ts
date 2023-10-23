import { AuthException, BadRequestException } from "@/core/entities/exceptions"
import { UpdateUserPassword, SetFirstPassword } from "./passwordSchema"
import { UserRepository } from "@/app/modules/user/userRepository"
import { PasswordRepository } from "./passwordRepository"
import { Auth } from "@/core/helpers"

export const PasswordService = {
  async updateUserPassword(userId: number, args: UpdateUserPassword) {
    if (args.password !== args.confirmPassword) {
      throw BadRequestException("password confirmation failed")
    }

    const user = await UserRepository.findById(userId)
    if (!user) {
      throw AuthException("cannot update user password", {
        userId,
        message: "non-existent user id in json token",
      })
    }

    await PasswordRepository.updateUserPassword(user, args.password)
  },

  async setFirstPassword(args: SetFirstPassword) {
    if (args.password !== args.confirmPassword) {
      throw BadRequestException("password confirmation failed", {
        message: "password confirmation mismatch when setting first password",
      })
    }

    const userId = await Auth.validateFirstPasswordToken(args.passwordToken)
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

    await PasswordRepository.setUserPassword(user, args.password)
  },
}
