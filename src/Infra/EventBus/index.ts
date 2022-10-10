import { EventBusService } from "./index.service"
import { listeners } from "./Listeners"
import { LoggerServiceInstance } from "@/Infra/Logger"

function init(): EventBusService {
  const bus = new EventBusService((error: Error) => {
    LoggerServiceInstance.log("event error", error)
  })

  /* activate all event listeners */
  for (const listener of listeners) {
    bus.registerListener(listener.key, listener.handler)
  }

  return bus
}

export const EventBusServiceInstance = init()
export { Func, ErrorHandlerFunc, IEventListener } from "./index.types"
