import { EnvSchema, IEnv } from "./Schema"
import { RuntimeError } from "@src/Application/Types/Errors"

export default class Env {
  private variables: IEnv

  constructor(variables: NodeJS.ProcessEnv) {
    const result = EnvSchema.safeParse(variables)
    if (!result.success) {
      throw new RuntimeError(
        "Required environment variables not set", 
        result.error.issues
      )
    }

    this.variables = result.data
  }

  Read(key: string): string {
    if (!(key in this.variables)) {
      throw new Error(`Invalid environment variable: ${key}`)
    }

    return this.variables[key]
  }
}