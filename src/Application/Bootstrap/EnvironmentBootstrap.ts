import { config } from "dotenv"
import { Service } from "typedi"
import { Option } from "@/Vendor/Types"
import { NodeEnv } from "@/Vendor/Entities/NodeEnv"
import { EnvironmentConfig } from "@/Application/Config"

@Service()
export class EnvironmentBootstrap {
  private env_config: EnvironmentConfig
  private nodeEnv: NodeEnv
  public readonly fileLoaded: boolean

  constructor(env_config: EnvironmentConfig, nodeEnv: NodeEnv) {
    this.env_config = env_config
    this.nodeEnv = nodeEnv
    this.fileLoaded = this.shouldLoadEnvFile()
  }

  /**
   *  return flag whether env file defined in Environment config should be
   *  loaded or not
   */
  private shouldLoadEnvFile(): boolean {
    const isProduction = this.nodeEnv.isProd()
    const shoudLoad = this.env_config.load_in_production

    if (isProduction && shoudLoad) return true
    if (isProduction !== shoudLoad) return false

    // final case: (!isProduction && !shoudLoad) return true
    return true
  }

  /**
   *  users are able to configure all the required environment variables in the
   *  config/EnvironmentConfig.ts file. Here we check if all of them are
   *  prevent in the environment
   */
  private validateRequired() {
    const isEmpty = (value: Option<string>) =>
      value === null || value === undefined || value === ""

    for (const value of this.env_config.required) {
      const isMissing = isEmpty(process.env[value])
      if (isMissing) throw new Error(`missing env variable: ${value}`)
    }
  }

  public bootstrap() {
    if (this.fileLoaded) {
      config({ path: this.env_config.file })
    }

    this.validateRequired()
  }
}
