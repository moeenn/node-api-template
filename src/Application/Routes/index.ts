import { Service } from "typedi"
import { AuthController } from "@/Application/Controllers"

@Service()
export class RouteRegistry {
  public readonly routes = [AuthController.Login]
}
