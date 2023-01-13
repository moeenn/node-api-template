import { MessageHandler } from "@/vendor/entities/sockets"

/**
 *  echo the received message back to the client
 *
 */
export const echo: MessageHandler = async (socket, payload) => {
  socket.send({
    message: "message received",
    payload,
  })
}
