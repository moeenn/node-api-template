import { Service } from "typedi"
import { UserService } from "@/Domain/User"
import {
  IRequestPasswordReset,
  IValidateToken,
  IResetForgottenPassword,
} from "./ForgetPasswordController.schema"
import {
  PasswordResetToken,
  PasswordResetTokenService,
} from "@/Domain/PasswordResetToken"
import { BadRequestException } from "@/Vendor/Exceptions"

@Service()
export class ForgetPasswordController {
  constructor(
    private userService: UserService,
    private passwordResetTokenService: PasswordResetTokenService,
  ) {}

  /**
   *  if a user forgets the password for their account, they will request
   *  a password reset, if the provided details make sense. we create
   *  a password reset token for them
   */
  public async requestPasswordReset(
    args: IRequestPasswordReset,
  ): Promise<PasswordResetToken> {
    const user = await this.userService.getUserByEmail(args.email)
    return await this.passwordResetTokenService.createToken(user)

    /* TODO: send email to user */
    /* TODO: auto-delete token after n-minutes */
  }

  /**
   *  check if the provided password reset token is valid
   *
   */
  public async validateToken(args: IValidateToken): Promise<boolean> {
    const token = await this.passwordResetTokenService.findToken(args.token)
    if (!token) return false
    return true
  }

  /**
   *  reset the user password using password reset token
   *
   */
  public async resetForgottenPassword(args: IResetForgottenPassword) {
    const token = await this.passwordResetTokenService.findToken(args.token)
    if (!token) {
      throw BadRequestException("invalid password reset token", {
        token: args.token,
      })
    }

    /* set new password */
    await this.userService.setUserPassword(token.user, args.password)

    /**
     *  password reset token should only be used once, i.e. delete after use
     */
    await this.passwordResetTokenService.deleteToken(token)
  }
}
