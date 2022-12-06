import { Service } from "typedi"

@Service()
export class EnvironmentConfig {
  public readonly file = ".env.local"
  public readonly load_in_production = false
  public readonly required: string[] = [
    "SERVER_PORT",
    "MONGO_HOST",
    "MONGO_PORT",
    "MONGO_DATABASE",
    "MONGO_USERNAME",
    "MONGO_PASSWORD",
  ]
}
