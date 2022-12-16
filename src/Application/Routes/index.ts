import { Service } from "typedi"
import { Register as UserRegister } from "./User/Register"

@Service()
export class RouteRegistry {
  public readonly routes = [UserRegister]
}
