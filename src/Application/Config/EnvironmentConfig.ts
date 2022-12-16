import { Service } from "typedi"

@Service()
export class EnvironmentConfig {
  public readonly file
  public readonly load_in_production
  public readonly required: string[]

  constructor() {
    this.file = ".env"
    this.load_in_production = false
    this.required = ["SERVER_PORT", "DATABASE_URI"]
  }
}
