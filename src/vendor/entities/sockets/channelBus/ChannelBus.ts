import EventEmitter from "node:events"
import { ISocket } from "@/vendor/entities/sockets"
import { IChannelBus } from "./index.types"
import { logger } from "@/vendor/entities/logger"

/**
 *  a central point for managing common orchestration events on all registered
 *  channels. This is a singleton class
 *
 *  e.g. removing a single (closing) socket from all channels can be done using
 *  an instance of this class
 */
export class ChannelBus implements IChannelBus {
  public readonly emitter: EventEmitter
  private static _instance: ChannelBus

  private constructor() {
    this.emitter = new EventEmitter()
  }

  /* return singleton instance */
  public static instance(): ChannelBus {
    if (!this._instance) {
      this._instance = new ChannelBus()
    }

    return this._instance
  }

  public closeSocket(socket: ISocket) {
    this.emitter.emit("socket.close", socket.id)
    logger.info({ message: "socket disconnected", id: socket.id })
  }
}
