import { FastifyInstance } from "fastify"
import { routes } from "@/app/routes"
import { IPlugin } from "./IPlugin"

export const routesPlugin: IPlugin = {
  plug() {
    return async (app: FastifyInstance) => {
      for (const route of routes) {
        app.route(route)
      }
    }
  },
}
