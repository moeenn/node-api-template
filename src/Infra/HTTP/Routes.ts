import fp from "fastify-plugin"
import { Container } from "typedi"
import { ServerInstance } from "./Server"
import Controller from "./Controller"

async function Routes(fastify: ServerInstance): Promise<void> {
  const controller = Container.get(Controller)

  fastify.get("/", controller.index())
  fastify.post("/", controller.create())
}

export default fp(Routes)