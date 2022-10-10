import { EventEmitter } from "node:events"
import { Func, ErrorHandlerFunc } from "./index.types"

export class EventBusService {
  private emitter: EventEmitter
  private eventKeys: Set<string>

  constructor(errorHandler: ErrorHandlerFunc) {
    this.emitter = new EventEmitter()
    this.eventKeys = new Set<string>(["error"])

    /**
     *  unhandled errors inside the event listeners can crash the node process
     *  we must set up an error handler
     */
    this.emitter.on("error", errorHandler)
  }

  private decorateEventHandler(handler: Func): Func {
    return async (...args: Record<string, unknown>[]) => {
      try {
        await handler(...args)
      } catch (error) {
        this.emitter.emit("error", { error })
      }
    }
  }

  /**
   *  add a new event listener for an event on the event bus
   *
   */
  registerListener(eventKey: string, callback: Func) {
    this.eventKeys.add(eventKey)
    this.emitter.on(eventKey, this.decorateEventHandler(callback))
  }

  /**
   *  emit an event on the event bus
   *
   */
  send(eventKey: string, payload: Record<string, unknown>) {
    if (!this.eventKeys.has(eventKey)) {
      this.emitter.emit(
        "error",
        new Error(`no event listener registered for event: ${eventKey}`),
      )
    }

    this.emitter.emit(eventKey, payload)
  }
}
