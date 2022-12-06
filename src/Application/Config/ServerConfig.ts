import { Service } from "typedi"
import { env } from "@/Vendor/Helpers"

@Service()
export class ServerConfig {
  /* dont change otherwise dockerization will be problematic */
  public readonly host = "0.0.0.0"
  public readonly port = parseInt(env("SERVER_PORT"))
}
