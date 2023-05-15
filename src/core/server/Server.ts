import fastify, { FastifyInstance } from "fastify"
import { fastifyRequestContextPlugin } from "@fastify/request-context"
import ajvFormats from "ajv-formats"
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

export const Server = {
  new(): FastifyInstance {
    /* disable request logging during testing */
    const app = fastify({ 
      logger: process.env.NODE_ENV !== "test",
      ajv: {
        plugins: [
          /** See: https://ajv.js.org/packages/ajv-formats.html */
          ajvFormats,
        ]
      } 
    })

    /* register all plugins */
    app
      .register(cors)
      .register(helmet, { global: true })
      .register(rateLimit, rateLimitPluginOptions)
      .register(fastifyRequestContextPlugin, requestContextPluginOptions)
      .register(routesPlugin.plug(), { prefix: serverConfig.apiPrefix })

    return app
  },

  start(app: FastifyInstance) {
    app.listen(serverConfig, (err) => {
      if (err) {
        app.log.error(err)
        process.exit(1)
      }
    })
  },
}
