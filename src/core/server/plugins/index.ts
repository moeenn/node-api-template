import { FastifyInstance, FastifyPluginOptions } from "fastify"
export { routesPlugin } from "./routesPlugin"
export { rateLimitPluginOptions } from "./rateLimitPluginOptions"
export { requestContextPluginOptions } from "./requestContextPluginOptions"

type NextFunction = (error?: Error | undefined) => void
export type FastifyPlugin = (
  app: FastifyInstance,
  _opts: FastifyPluginOptions,
  next: NextFunction,
) => void
