import { EnvironmentSchema, IEnvironment } from "./Schema"
import { RuntimeError } from "@src/Application/Types/Errors"

export default class Environment {
  private variables: IEnvironment

  constructor(variables: NodeJS.ProcessEnv) {
    const result = EnvironmentSchema.safeParse(variables)
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