import { FastifyInstance } from "fastify"
import { routers } from "@/app/routers"

export const routesPlugin = {
  plug() {
    return async (app: FastifyInstance) => {
      for (const [prefix, router] of routers) {
        app.register(router, { prefix })
      }
    }
  },
}
