import { MessageHandler } from "@/vendor/entities/sockets"
import { testChannel } from "@/app/messages/channels"

/**
 *  allow a user to subscribe to a test channel
 *  TODO: remove in production
 */
export const subscribeTestChannel: MessageHandler = async (socket) => {
  testChannel.subscribe(socket)

  return socket.send({
    message: "subscribed successfully",
    channel_name: testChannel.name,
  })
}
