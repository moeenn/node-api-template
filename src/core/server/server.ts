import fastify, { FastifyInstance } from "fastify"
import { fastifyRequestContextPlugin } from "@fastify/request-context"
import cors from "@fastify/cors"
import helmet from "@fastify/helmet"
import rateLimit from "@fastify/rate-limit"
import {
  routesPlugin,
  rateLimitPluginOptions,
  requestContextPluginOptions,
  FastifyPlugin,
} from "./plugins"
import { serverConfig } from "@/app/config"

export const Server = {
  new(): FastifyInstance {
    /* disable request logging during testing */
    const app = fastify({ logger: true })

    /* register all plugins */
    app
      .register(cors)
      .register(helmet, { global: true })
      .register(rateLimit, rateLimitPluginOptions)
      .register(fastifyRequestContextPlugin, requestContextPluginOptions)
      .register(routesPlugin.plug())

    return app
  },

  /**
   * start the web server process on the provided port
   * promise is used so the caller can know when the server has finished
   * initialization
   */
  start(app: FastifyInstance): Promise<void> {
    return new Promise((_resolve, reject) => {
      app.listen(serverConfig, (err) => {
        if (err) {
          reject(err)
        }
      })
    })
  },

  /** construct a miminal server to testing purposes */
  newTestServer(router: FastifyPlugin): FastifyInstance {
    const instance = fastify({ logger: false })
    instance.register(fastifyRequestContextPlugin, requestContextPluginOptions)
    instance.register(router)

    return instance
  },
}
