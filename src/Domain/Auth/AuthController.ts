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

  public async login(args: ILogin, isAdmin: boolean): Promise<ILoginResponse> {
    const user = await this.userService.getUserByEmail(args.email)
    if (!user.password) {
      throw BadRequestException("user account not configured")
    }

    /**
     *  ordinary users should not be able to login to the admin dashboard,
     *  only admins should be able to login to the dashboard
     */
    const isCurrentUserAadmin = await this.userService.hasRole(user, "admin")
    if (isAdmin && !isCurrentUserAadmin) {
      throw AuthException("only authorized roles can access this resource", {
        authorized_roles: ["admin"],
      })
    }

    /* only allow approved users to login */
    if (!user.approved) {
      throw AuthException(
        "user account has been disabled by system administrators",
      )
    }

    const isValid = await Password.verify(user.password, args.password)
    if (!isValid) {
      throw AuthException("invalid email or password")
    }

    /* dont send password hash back to the client */
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

  /**
   *  logout an already logged-in user
   *  FIXME: logout function runs twice
   */
  public async logout(token: string) {
    const authToken = await this.authTokenService.validateToken(token)
    await this.authTokenService.revokeToken(authToken)
  }
}
