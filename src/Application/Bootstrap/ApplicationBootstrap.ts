import { Service } from "typedi"
import { EnvironmentBootstrap } from "./EnvironmentBootstrap"
import { DatabaseBootstrap } from "./DatabaseBootstrap"

@Service()
export class ApplicationBootstrap {
  constructor(environment: EnvironmentBootstrap, /*database: DatabaseBootstrap */) {
    environment.bootstrap()
    // database.bootstrap()
  }
}
