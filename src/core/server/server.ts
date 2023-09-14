import fastify, { FastifyInstance } from "fastify"
import { fastifyRequestContextPlugin } from "@fastify/request-context"
import cors from "@fastify/cors"
import helmet from "@fastify/helmet"
import rateLimit from "@fastify/rate-limit"
import {
  routesPlugin,
  rateLimitPluginOptions,
  requestContextPluginOptions,
} from "./plugins"
import { serverConfig } from "@/app/config"
import process from "node:process"
import { isTest } from "@/core/helpers/isTest"

export const Server = {
  new(): FastifyInstance {
    /* disable request logging during testing */
    const app = fastify({ logger: !isTest() })

    /* register all plugins */
    app
      .register(cors)
      .register(helmet, { global: true })
      .register(rateLimit, rateLimitPluginOptions)
      .register(fastifyRequestContextPlugin, requestContextPluginOptions)
      .register(routesPlugin.plug(), { prefix: serverConfig.apiPrefix })

    return app
  },

  /**
   * start the web server process on the provided port
   * promise is used so the caller can know when the server has finished
   * initialization
   */
  start(app: FastifyInstance) {
    app.listen(serverConfig, (err) => {
      if (err) {
        app.log.error(err)
        process.exit(1)
      }
    })
  },
}
