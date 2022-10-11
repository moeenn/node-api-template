import { EventBus } from "./index.service"
import { eventListeners, EventTypes } from "./Listeners"
import { LoggerServiceInstance } from "@/Infra/Logger"

function init(): EventBus {
  const bus = new EventBus((error: Error) => {
    LoggerServiceInstance.info("event error", error)
  })

  for (const e of eventListeners) {
    bus.registerListener(e.key as keyof EventTypes, e.handler)
  }

  return bus
}

export const EventBusServiceInstance = init()
