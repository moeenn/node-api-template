import { Service } from "typedi"
import { env } from "process"

interface INodeEnv {
  production: boolean
}

@Service()
export default class NodeEnv implements INodeEnv {
  public production: boolean

  constructor() {
    this.production = env.NODE_ENV === "production"
  }
}