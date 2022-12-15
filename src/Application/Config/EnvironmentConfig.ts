import { Service } from "typedi"

@Service()
export class EnvironmentConfig {
  public readonly file
  public readonly load_in_production
  public readonly required: string[]

  constructor() {
    this.file = ".env.local"
    this.load_in_production = false
    this.required = [
      "SERVER_PORT",
      "PG_HOST",
      "PG_PORT",
      "PG_DATABASE",
      "PG_USERNAME",
      "PG_PASSWORD",
    ]
  }
}
