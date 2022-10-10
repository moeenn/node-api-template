import fastify, {
  DoneFuncWithErrOrRes,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteOptions,
} from "fastify"

import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod"
import { fastifyRequestContextPlugin } from "@fastify/request-context"
import socket from "@fastify/websocket"
import cors from "@fastify/cors"
import helmet from "@fastify/helmet"
import { APIRoutes } from "./Routes"
// import { SocketRoutes } from "./Sockets"
import { AuthConfig } from "@/Application/Config"

export {
  FastifyInstance,
  FastifyRequest as Request,
  FastifyReply as Reply,
  RouteOptions,
  DoneFuncWithErrOrRes as Done,
}

export class ServerFactory {
  private app: FastifyInstance

  constructor() {
    this.app = fastify({ logger: true })

    /** set zod as the schema validator */
    this.app
      .setValidatorCompiler(validatorCompiler)
      .setSerializerCompiler(serializerCompiler)

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
        defaultStoreValues: AuthConfig.state_defaults,
      })
  }

  private registerRoutes() {
    this.app.register(APIRoutes, { prefix: "/api/v1/" })
    // this.app.register(SocketRoutes)
  }

  public run(port: number) {
    this.app.listen({ port }, (err) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
    })
  }
}
