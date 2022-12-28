import { Service } from "typedi"

@Service()
export class ServerConfig {
  /* dont change otherwise dockerization will be problematic */
  public readonly host: string
  public readonly port: number
  public readonly api_prefix: string
  public readonly rate_limit: {
    max: number
    timeWindow: number
  }

  constructor() {
    this.host = "0.0.0.0"
    this.port = 5000
    this.api_prefix = "/api/v1/"

    /* global: max requests to allow per IP during each time window */
    this.rate_limit = {
      max: 30,
      timeWindow: 60000 /* 1 minute i.e. 1000 ms * 60 */,
    }
  }
}
