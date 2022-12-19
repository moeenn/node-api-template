import { Service } from "typedi"
import { Register as UserRegister } from "./User/Register"
import { Login as UserLogin } from "./Auth/Login"
import { SetPassword as SetUserFirstPassword } from "./Auth/SetPassword"
import { Logout as UserLogout } from "./Auth/Logout"
import { GetUserProfile } from "./User/GetUserProfile"
import { RequestPasswordReset } from "./ForgetPassword/RequestPasswordReset"
import { ValidatePasswordResetToken } from "./ForgetPassword/ValidatePasswordResetToken"
import { ResetForgottenPassword } from "./ForgetPassword/ResetForgottenPassword"

@Service()
export class RouteRegistry {
  public readonly routes = [
    UserRegister,
    UserLogin,
    SetUserFirstPassword,
    UserLogout,
    RequestPasswordReset,
    ValidatePasswordResetToken,
    ResetForgottenPassword,
    GetUserProfile,
  ]
}
