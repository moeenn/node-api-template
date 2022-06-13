import { Service } from "typedi"
import { IEnv } from "@src/Infra/Env"

@Service()
export default class DatabaseConfig {
  public host: string
  public port: number
  public database: string
  public username: string
  public password: string

  constructor(env: IEnv) {
    this.host = env.read("DB_HOST")
    this.port = parseInt(env.read("DB_PORT"))
    this.database = env.read("DB_DATABASE")
    this.username = env.read("DB_USERNAME")
    this.password = env.read("DB_PASSWORD")
  }
}
