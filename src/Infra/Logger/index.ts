import { LoggerService } from "./index.service"

function init(): LoggerService {
  return new LoggerService()
}

export const LoggerServiceInstance = init()
export { LoggerService } from "./index.service"
