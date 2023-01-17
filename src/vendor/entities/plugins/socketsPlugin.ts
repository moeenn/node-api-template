import { FastifyInstance } from "@/vendor/entities/server"
import { SocketStream } from "@fastify/websocket"
import { Socket } from "@/vendor/entities/sockets"
import { logger } from "@/vendor/entities/logger"
import { messageRouterInstance } from "@/vendor/entities/sockets"
import { socketConfig } from "@/app/config"
import { channelBusInstance } from "@/vendor/entities/sockets"

/**
 *  this function defines a fastify plugin which is responsible for handling
 *  socket connections
 */
export async function socketsPlugin(app: FastifyInstance) {
  app.get(socketConfig.prefix, { websocket: true }, (conn: SocketStream) => {
    const socket = new Socket(conn.socket)
    logger.info({ message: "new socket connected", id: socket.id })

    /* error handling and routing of messages */
    socket.socket.on("message", messageRouterInstance.handleMessage(socket))

    /* cleanup: remove all socket subscriptions on close */
    socket.socket.on("close", () => {
      channelBusInstance.closeSocket(socket)
    })
  })
}
