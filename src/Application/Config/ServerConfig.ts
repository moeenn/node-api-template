import { Service } from "typedi"
import { env } from "@/Vendor/Helpers"

@Service()
export class ServerConfig {
  /* dont change otherwise dockerization will be problematic */
  public readonly host: string
  public readonly port: number

  constructor() {
    this.host = "0.0.0.0"
    this.port = parseInt(env("SERVER_PORT"))
  }
}
