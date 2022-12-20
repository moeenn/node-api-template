import { Service } from "typedi"
import { EnvironmentBootstrap } from "./EnvironmentBootstrap"

@Service()
export class ApplicationBootstrap {
  constructor(environment: EnvironmentBootstrap) {
    environment.bootstrap()
  }
}
