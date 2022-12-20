import { Service } from "typedi"

@Service()
export class EnvironmentConfig {
  public readonly file
  public readonly load_in_production
  public readonly required: string[]

  constructor() {
    this.file = ".env"
    this.load_in_production = false
    this.required = ["APP_NAME", "FRONTEND_URL", "SERVER_PORT", "DATABASE_URI"]
  }
}
