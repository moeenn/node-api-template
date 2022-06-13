import { config } from "dotenv"
import { env } from "process"
import { EnvSchema, IEnv } from "./index.schema"
import { Service } from "typedi"
import Exception from "@src/Application/Classes/Exception"

@Service()
export default class Env {
  private variables: IEnv
  private nodeProdMode = "production"

  constructor() {
    if (env.NODE_ENV !== this.nodeProdMode) {
      config({ path: "src/.env.docker" })
    }

    this.variables = this.validateEnvVariable(env)
  }

  private validateEnvVariable(variables: NodeJS.ProcessEnv): IEnv {
    const result = EnvSchema.safeParse(variables)
    if (!result.success) {
      throw new Exception(
        "Required environment variables not set",
        result.error.issues,
      )
    }

    return result.data
  }

  read(key: string): string {
    if (!(key in this.variables)) {
      throw new Error(`Invalid environment variable: ${key}`)
    }

    return this.variables[key]
  }
}