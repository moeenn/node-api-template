import { FastifyInstance } from "fastify"

export interface IPlugin {
  plug: () => (app: FastifyInstance) => Promise<void>
}
