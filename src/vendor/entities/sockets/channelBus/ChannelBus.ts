import EventEmitter from "node:events"
import { ISocket } from "@/vendor/entities/sockets"
import { IChannelBus } from "./index.types"
import { logger } from "@/vendor/entities/logger"

/**
 *  a central point for managing common orchestration events on all registered
 *  channels
 *
 *  e.g. removing a single (closing) socket from all channels can be done using
 *  an instance of this class
 */
export class ChannelBus implements IChannelBus {
  public readonly emitter: EventEmitter

  constructor() {
    this.emitter = new EventEmitter()
  }

  public closeSocket(socket: ISocket) {
    this.emitter.emit("socket.close", {
      socketID: socket.id,
    })

    logger.info({ message: "socket disconnected", id: socket.id })
  }
}
