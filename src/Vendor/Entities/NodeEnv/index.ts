import { Service } from "typedi"
import { Option } from "@/Vendor/Types"

/**
 *  side-effect class
 *  TODO: consider implementing mock and interface class
 */
@Service()
export class NodeEnv {
  public readonly mode: string

  constructor(override: Option<string> = undefined) {
    if (override) {
      this.mode = override
      return
    }

    this.mode = process.env.NODE_ENV ?? "development"
  }

  public isDev(): boolean {
    return this.mode === "development"
  }

  public isProd(): boolean {
    return this.mode === "production"
  }
}
