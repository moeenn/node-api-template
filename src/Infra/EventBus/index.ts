import EventBus from "./index.service"
import listeners from "./Listeners"
import LoggerInstance from "@/Infra/Logger"

function init(): EventBus {
  const bus = new EventBus((error: Error) => {
    LoggerInstance.log("event error", error)
  })

  /* activate all event listeners */
  for (const listener of listeners) {
    bus.registerListener(listener.key, listener.handler)
  }

  return bus
}

export default init()
export { Func, ErrorHandlerFunc, IEventListener } from "./index.types"