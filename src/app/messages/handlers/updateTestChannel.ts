import { MessageHandler } from "@/vendor/entities/sockets"
import { z } from "zod"
import { validate } from "@/vendor/helpers"
import { testChannel } from "@/app/messages/channels"

const schema = z.object({
  key: z.string(),
  value: z.string(),
})

/**
 *  send updates to all sockets subscribed to the test channel
 *  TODO: remove in production
 */
export const updateTestChannel: MessageHandler = async (socket, payload) => {
  const validated = validate(payload, schema)
  testChannel.publish(validated)

  return socket.send({
    message: "message published to channel",
    channel_name: testChannel.name,
  })
}
