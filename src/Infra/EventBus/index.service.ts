import EventEmitter from "node:events"
import TypedEmitter from "typed-emitter"
import { ErrorHandlerFunc, ListenerFunc } from "./index.types"
import { EventTypes } from "./Listeners"

export class EventBus {
  private _emitter: TypedEmitter<EventTypes>

  constructor(errorHandler: ErrorHandlerFunc) {
    this._emitter = new EventEmitter() as TypedEmitter<EventTypes>
    this._emitter.on("error", errorHandler)
  }

  get emitter(): TypedEmitter<EventTypes> {
    return this._emitter
  }

  private decorateEventHandler(handler: ListenerFunc): ListenerFunc {
    return async (...args: Record<string, unknown>[]) => {
      try {
        await handler(...args)
      } catch (error) {
        this._emitter.emit("error", error as Error)
      }
    }
  }

  /**
   *  add a new event listener for an event on the event bus
   *
   */
  registerListener(eventKey: keyof EventTypes, callback: ListenerFunc) {
    this._emitter.on(eventKey, this.decorateEventHandler(callback))
  }
}
