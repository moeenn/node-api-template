import { Service } from "typedi"
import { Register as UserRegister } from "./User/Register"
import { Login as UserLogin } from "./Auth/Login"

@Service()
export class RouteRegistry {
  public readonly routes = [UserRegister, UserLogin]
}
