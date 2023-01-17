import { ISocket } from "@/vendor/entities/sockets"
import EventEmitter from "node:events"

export interface IChannelBus {
  emitter: EventEmitter
  closeSocket: (socket: ISocket) => void
}
