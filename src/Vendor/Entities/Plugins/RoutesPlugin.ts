import { Service } from "typedi"
import { FastifyInstance } from "fastify"
import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod"
import { RouteRegistry } from "@/Application/Routes"
import { IPlugin } from "./IPlugin"

@Service()
export class RoutesPlugin implements IPlugin {
  private routes: RouteRegistry

  constructor(routes: RouteRegistry) {
    this.routes = routes
  }

  /**
   *  replace default schema engine with zod
   *
   */
  public plug() {
    return async (app: FastifyInstance) => {
      app
        .setValidatorCompiler(validatorCompiler)
        .setSerializerCompiler(serializerCompiler)

      for (const route of this.routes.routes) {
        app.withTypeProvider<ZodTypeProvider>().route(route)
      }
    }
  }
}
