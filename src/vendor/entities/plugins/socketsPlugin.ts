import { FastifyInstance } from "@/vendor/entities/server"
import { SocketStream } from "@fastify/websocket"
import { Socket } from "@/vendor/entities/sockets"
import { logger } from "@/vendor/entities/logger"
import { MessageRouter } from "@/vendor/entities/sockets"
import { socketConfig } from "@/app/config"
import { ChannelBus } from "@/vendor/entities/sockets/channelBus"

/**
 *  this function defines a fastify plugin which is responsible for handling
 *  socket connections
 */
export async function socketsPlugin(app: FastifyInstance) {
  app.get(socketConfig.prefix, { websocket: true }, (conn: SocketStream) => {
    const socket = new Socket(conn.socket)
    logger.info({ message: "new socket connected", id: socket.id })

    /* error handling and routing of messages */
    socket.socket.on("message", MessageRouter.instance().handleMessage(socket))

    /* cleanup: remove all socket subscriptions on close */
    socket.socket.on("close", () => {
      ChannelBus.instance().closeSocket(socket)
    })
  })
}
