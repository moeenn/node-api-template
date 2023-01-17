import { MessageHandler, IMessage, ISocket } from "@/vendor/entities/sockets"
import { IMessageRouter } from "./index.types"
import { messageDefinitions } from "@/app/messages/handlers"
import { isJSON } from "@/vendor/helpers"
import { logger } from "@/vendor/entities/logger"

export class MessageRouter implements IMessageRouter {
  private messages: Map<string, MessageHandler> = new Map()

  constructor() {
    /**
     *  register list of message handlers defined in the app directory
     *
     */
    for (const definition of messageDefinitions) {
      this.messages.set(definition.type, definition.handler)
    }
  }

  /**
   *  ensure that the incoming message has the required fields
   *  i.e. type and payload
   */
  private validatePayload(buffer: Buffer): IMessage {
    const payloadJSON = buffer.toString()
    if (!isJSON(payloadJSON)) {
      throw new Error("invalid JSON in incoming message payload")
    }

    const { type, payload } = JSON.parse(payloadJSON)
    if (!type || typeof type !== "string") {
      throw new Error("key 'type' missing in incoming message payload")
    }

    return { type, payload }
  }

  /**
   *  based on the message.type, route the request to the appropriate socket
   *  message handler
   *
   */
  private async routeMessage(socket: ISocket, message: IMessage) {
    if (!message.type) {
      throw new Error("please provide a valid message type")
    }

    const handler = this.messages.get(message.type)
    if (!handler) {
      return socket.send({
        error: `invalid message type: ${message.type}`,
      })
    }

    return await handler(socket, message.payload)
  }

  /**
   *  handle new incoming messaging on open socket connection
   *
   */
  public handleMessage(socket: ISocket) {
    return async (buffer: Buffer) => {
      try {
        const message = this.validatePayload(buffer)
        await this.routeMessage(socket, message)

        logger.info({
          message: "message on socket",
          type: message.type,
          socket_id: socket.id,
        })
      } catch (err) {
        const message = (err as Error).message
        const parsed = isJSON(message) ? JSON.parse(message) : message

        logger.error({
          message: "error when processing socket response",
          error: parsed,
        })

        socket.send({ error: parsed })
      }
    }
  }
}
