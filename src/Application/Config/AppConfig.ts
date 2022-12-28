import { Service } from "typedi"

@Service()
export class AppConfig {
  public readonly appName: string
  public readonly frontendURL: string

  constructor() {
    this.appName = "Sample Application" /* TODO: set an actual name */
    this.frontendURL = "http://site.com/"
  }
}
