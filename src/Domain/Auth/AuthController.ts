import { Service } from "typedi"
import { AuthTokenService } from "@/Domain/AuthToken"
import { UserService } from "@/Domain/User"
import { PasswordTokenService } from "@/Domain/PasswordToken"
import {
  ILogin,
  ILoginResponse,
  ISetFirstPassword,
} from "./AuthController.schema"
import { BadRequestException, AuthException } from "@/Vendor/Exceptions"
import { Password } from "@/Vendor/Helpers"

@Service()
export class AuthController {
  constructor(
    private userService: UserService,
    private authTokenService: AuthTokenService,
    private passwordTokenService: PasswordTokenService,
  ) {}

  public async login(args: ILogin): Promise<ILoginResponse> {
    const user = await this.userService.getUserByEmail(args.email)
    if (!user.password) {
      throw BadRequestException("user account not configured", {
        user_id: user.id,
      })
    }

    const isValid = await Password.verify(user.password, args.password)
    if (!isValid) {
      throw AuthException("invalid email or password")
    }

    user.password = null

    const token = await this.authTokenService.createToken(user)
    return {
      user,
      token: token.token,
    }
  }

  /**
   *  before a user sets their first password, their password field will be
   *  empty
   */
  public async setFirstPassword(args: ISetFirstPassword) {
    const passwordTokenInstance = await this.passwordTokenService.findToken(
      args.password_token,
    )

    if (!passwordTokenInstance.user) {
      throw BadRequestException("user not found against passwordToken", {
        password_token_id: passwordTokenInstance.id,
      })
    }

    await this.userService.setUserPassword(
      passwordTokenInstance.user,
      args.password,
    )

    /**
     *  password token can only be used once, i.e. to set the first password
     *  for the user. we remove it when password is successfully set
     */
    await this.passwordTokenService.deleteToken(passwordTokenInstance)
  }
}
