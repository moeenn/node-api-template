import fastify, { FastifyInstance } from "fastify"
import { fastifyRequestContextPlugin } from "@fastify/request-context"
import cors from "@fastify/cors"
import helmet from "@fastify/helmet"
import rateLimit from "@fastify/rate-limit"
import socket from "@fastify/websocket"
import {
  routesPlugin,
  rateLimitPluginOptions,
  requestContextPluginOptions,
  socketsPlugin,
} from "@/vendor/entities/plugins"
import { serverConfig } from "@/app/config"
import { errorHandler } from "./errorHandler"

export class Server {
  private app: FastifyInstance

  constructor() {
    this.app = fastify({ logger: true })

    /** register the custom global error handler */
    this.app.setErrorHandler(errorHandler)
    this.registerPlugins()
    this.registerRoutes()
  }

  private registerPlugins() {
    this.app
      .register(cors)
      .register(helmet, { global: true })
      .register(rateLimit, rateLimitPluginOptions)
      .register(fastifyRequestContextPlugin, requestContextPluginOptions)
      .register(socket)
      .register(socketsPlugin)
  }

  private registerRoutes() {
    this.app.register(routesPlugin.plug(), {
      prefix: serverConfig.apiPrefix,
    })
  }

  /**
   *  start the web server process on the provided port
   *  promise is used so the caller can know when the server has finished
   *  initialization
   */
  public run(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.app.listen(serverConfig, (err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
  }
}
