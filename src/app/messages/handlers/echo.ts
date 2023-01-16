import { MessageHandler } from "@/vendor/entities/sockets"
import { z } from "zod"
import { validate } from "@/vendor/helpers"

const schema = z.object({
  message: z.string(),
})

/**
 *  echo a received message back to the client
 *
 */
export const echo: MessageHandler = async (socket, payload) => {
  const validated = validate(payload, schema)

  return socket.send({
    message: validated.message,
  })
}
