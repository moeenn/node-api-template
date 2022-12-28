import { Service } from "typedi"

import fastify, { FastifyInstance, FastifyRequest } from "fastify"
import { fastifyRequestContextPlugin } from "@fastify/request-context"
import cors from "@fastify/cors"
import helmet from "@fastify/helmet"
import rateLimit from "@fastify/rate-limit"
import { RoutesPlugin } from "@/Vendor/Entities/Plugins"
import { AuthConfig, ServerConfig } from "@/Application/Config"
import { ErrorHandler } from "./ErrorHandler"

@Service()
export class Server {
  private app: FastifyInstance

  constructor(
    private serverConfig: ServerConfig,
    private routesPlugin: RoutesPlugin,
    private authConfig: AuthConfig,
  ) {
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
      .register(rateLimit, {
        ...this.serverConfig.rate_limit,
        errorResponseBuilder: this.rateLimitExceedHandler(),
      })
      .register(fastifyRequestContextPlugin, {
        hook: "preValidation",
        defaultStoreValues: this.authConfig.auth_state_defaults,
      })
  }

  private registerRoutes() {
    this.app.register(this.routesPlugin.plug(), {
      prefix: this.serverConfig.api_prefix,
    })
  }

  private rateLimitExceedHandler() {
    return (
      req: FastifyRequest,
      context: { after: string; max: number; ttl: number },
    ) => {
      return {
        code: 429,
        error: "too many requests",
        message: `exceeded limit of ${context.max} requests per ${context.after}`,
        date: Date.now(),
        expiresIn: context.ttl, // milliseconds
      }
    }
  }

  /**
   *  start the web server process on the provided port
   *  promise is used so the caller can know when the server has finished
   *  initialization
   */
  public run(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.app.listen(this.serverConfig, (err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
  }
}
