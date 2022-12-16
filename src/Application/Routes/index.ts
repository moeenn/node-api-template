import { Service } from "typedi"
import { Register as UserRegister } from "./User/Register"
import { Login as UserLogin } from "./Auth/Login"
import { SetPassword as SetUserFirstPassword } from "./Auth/SetPassword"

@Service()
export class RouteRegistry {
  public readonly routes = [UserRegister, UserLogin, SetUserFirstPassword]
}
