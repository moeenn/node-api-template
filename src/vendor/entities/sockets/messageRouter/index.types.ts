import { MessageHandler, ISocket } from "@/vendor/entities/sockets"

export interface IMessageRouter {
  handleMessage: (socket: ISocket) => void
}

export interface MessageDefinition {
  type: string
  handler: MessageHandler
}
