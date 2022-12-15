import { Service } from "typedi"
import { Option } from "@/Vendor/Types"
import { env } from "@/Vendor/Helpers"

/* TODO: deprecate */
@Service()
export class DatabaseConfig {
  public readonly uri

  constructor(URI: Option<string> = undefined) {
    this.uri = URI ?? env("DB_URI")
  }
}
