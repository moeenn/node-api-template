import { IMessage } from "@/vendor/entities/sockets"
import { registeredMessages } from "@/app/messages"
import { isJSON } from "@/vendor/helpers"
import { Socket } from "@/vendor/entities/sockets"
import { logger } from "@/vendor/entities/logger"

/**
 *  ensure that the incoming message has the required fields
 *
 */
export function validatePayload(buffer: Buffer): IMessage {
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
export async function routeMessage(
  socket: Socket,
  message: IMessage,
): Promise<void> {
  if (!message.type) {
    throw new Error("please provide a valid message type")
  }

  const handler = registeredMessages.get(message.type)
  if (!handler) {
    return socket.send({
      error: `invalid message type: ${message.type}`,
    })
  }

  return handler(socket, message.payload)
}

/**
 *  handle new incoming messaging on open socket connection
 *
 */
export function handleMessage(socket: Socket) {
  return async (buffer: Buffer) => {
    try {
      const message = validatePayload(buffer)
      await routeMessage(socket, message)

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
