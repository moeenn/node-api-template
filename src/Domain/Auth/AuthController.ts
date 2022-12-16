import { Service } from "typedi"
import { AuthTokenService } from "@/Domain/AuthToken"
import { UserService } from "@/Domain/User"
import { ILogin, ILoginResponse } from "./AuthController.schema"
import { BadRequestException, AuthException } from "@/Vendor/Exceptions"
import { Password } from "@/Vendor/Helpers"

@Service()
export class AuthController {
  constructor(
    private userService: UserService,
    private authTokenService: AuthTokenService,
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

    const token = await this.authTokenService.createToken(user)
    return {
      user,
      token: token.token,
    }
  }
}
