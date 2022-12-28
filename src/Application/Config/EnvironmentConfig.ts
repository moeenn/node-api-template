import { Service } from "typedi"

@Service()
export class EnvironmentConfig {
  public readonly file
  public readonly load_in_production
  public readonly required: string[]

  constructor() {
    this.file = ".env.development"
    this.load_in_production = false
    this.required = ["DATABASE_URI"]
  }
}
