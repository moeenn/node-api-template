import { Service } from "typedi"

import fastify, { FastifyInstance } from "fastify"
import { fastifyRequestContextPlugin } from "@fastify/request-context"
import socket from "@fastify/websocket"
import cors from "@fastify/cors"
import helmet from "@fastify/helmet"
import { RoutesPlugin } from "@/Vendor/Entities/Plugins/RoutesPlugin"
// TODO: implement
// import { SocketRoutes } from "@/Infra/HTTP/Sockets"
import { AuthConfig, ServerConfig } from "@/Application/Config"
import { ErrorHandler } from "./ErrorHandler"

@Service()
export class Server {
  private app: FastifyInstance
  private authConfig: AuthConfig
  private serverConfig: ServerConfig
  private routesPlugin: RoutesPlugin

  constructor(
    routesPlugin: RoutesPlugin,
    authConfig: AuthConfig,
    serverConfig: ServerConfig,
  ) {
    this.serverConfig = serverConfig
    this.authConfig = authConfig
    this.routesPlugin = routesPlugin
    this.app = fastify({ logger: true })

    /** register the custom global error handler */
    this.app.setErrorHandler(ErrorHandler)

    this.registerPlugins()
    this.registerRoutes()
  }

  private registerPlugins() {
    this.app
      .register(cors)
      .register(helmet, { global: true })
      .register(socket)
      .register(fastifyRequestContextPlugin, {
        hook: "preValidation",
        defaultStoreValues: this.authConfig.state_defaults,
      })
  }

  private registerRoutes() {
    this.app.register(this.routesPlugin.plug(), { prefix: "/api/v1/" })
    // TODO: implement
    // this.app.register(SocketRoutes)
  }

  /**
   *  start the web server process on the provided port
   *  promise is used so the caller can know when the server has finished
   *  initialization
   */
  public async run(): Promise<void> {
    const { host, port } = this.serverConfig

    return new Promise((resolve, reject) => {
      this.app.listen({ port, host }, (err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
  }
}
