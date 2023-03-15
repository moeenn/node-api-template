import { FastifyInstance } from "fastify"
import { routes } from "@/app/routes"

export const routesPlugin = {
  plug() {
    return async (app: FastifyInstance) => {
      for (const route of routes) {
        app.route(route)
      }
    }
  },
}
