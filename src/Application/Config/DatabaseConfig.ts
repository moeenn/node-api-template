import { Service } from "typedi"
import { Option } from "@/Vendor/Types"
import { env } from "@/Vendor/Helpers"

@Service()
export class DatabaseConfig {
  public readonly host
  public readonly port
  public readonly db
  public readonly username
  public readonly password

  constructor(
    host: Option<string> = undefined,
    port: Option<string> = undefined,
    db: Option<string> = undefined,
    username: Option<string> = undefined,
    password: Option<string> = undefined,
  ) {
    this.host = host ?? env("MONGO_HOST")
    this.port = port ?? env("MONGO_PORT")
    this.db = db ?? env("MONGO_DATABASE")
    this.username = username ?? env("MONGO_USERNAME")
    this.password = password ?? env("MONGO_PASSWORD")
  }
}
