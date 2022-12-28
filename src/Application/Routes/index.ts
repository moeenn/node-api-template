import { Service } from "typedi"
import { Register as UserRegister } from "./User/Register"
import { UserLogin } from "./Auth/UserLogin"
import { AdminLogin } from "./Auth/AdminLogin"
import { SetPassword as SetUserFirstPassword } from "./Auth/SetPassword"
import { Logout as UserLogout } from "./Auth/Logout"
import { GetUserProfile } from "./User/GetUserProfile"
import { ApproveDisapproveUser } from "./User/ApproveDisapproveUser"
import { RequestPasswordReset } from "./ForgetPassword/RequestPasswordReset"
import { ValidatePasswordResetToken } from "./ForgetPassword/ValidatePasswordResetToken"
import { ResetForgottenPassword } from "./ForgetPassword/ResetForgottenPassword"

@Service()
export class RouteRegistry {
  public readonly routes = [
    UserRegister,
    UserLogin,
    AdminLogin,
    SetUserFirstPassword,
    UserLogout,
    RequestPasswordReset,
    ValidatePasswordResetToken,
    ResetForgottenPassword,
    GetUserProfile,
    ApproveDisapproveUser,
  ]
}
