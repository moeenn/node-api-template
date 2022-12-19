import { Service } from "typedi"
import { Register as UserRegister } from "./User/Register"
import { Login as UserLogin } from "./Auth/Login"
import { SetPassword as SetUserFirstPassword } from "./Auth/SetPassword"
import { Logout as UserLogout } from "./Auth/Logout"

@Service()
export class RouteRegistry {
  public readonly routes = [
    UserRegister,
    UserLogin,
    SetUserFirstPassword,
    UserLogout
  ]
}
