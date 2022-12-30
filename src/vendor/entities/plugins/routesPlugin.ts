import { FastifyInstance } from "fastify"
import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod"
import { routes } from "@/app/routes"
import { IPlugin } from "./IPlugin"

export const routesPlugin: IPlugin = {
  plug() {
    return async (app: FastifyInstance) => {
      app
        .setValidatorCompiler(validatorCompiler)
        .setSerializerCompiler(serializerCompiler)

      for (const route of routes) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        app.withTypeProvider<ZodTypeProvider>().route(route as any)
      }
    }
  },
}
