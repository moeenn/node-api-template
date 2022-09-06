import LoggerService from "./index.service"

function init(): LoggerService {
  return new LoggerService()
}

export default init()
export { default as Logger } from "./index.service"