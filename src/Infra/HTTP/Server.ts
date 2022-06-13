import { Service } from "typedi"
import Fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
  RouteShorthandOptionsWithHandler
} from "fastify"
import helmet from "@fastify/helmet"
import Routes from "./Routes"

export type ServerInstance = FastifyInstance
export type Request = FastifyRequest
export type Response = FastifyReply
export type RouteOptions = RouteShorthandOptionsWithHandler

export interface IServer {
  start: (port: number) => Promise<void>
}

@Service()
export default class Server implements IServer {
  private app: FastifyInstance

  constructor() {
    this.app = Fastify({ logger: true })
    this.registerPlugins()
  }

  private registerPlugins(): void {
    this.app.register(helmet)
    this.app.register(Routes)
  }

  async start(port: number): Promise<void> {
    try {
      await this.app.listen({ port })
    } catch (err) {
      this.app.log.error(err)
      process.exit(1)
    }
  }
}