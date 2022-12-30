import { FastifyRegisterOptions } from "fastify"
import { FastifyRequestContextOptions } from "@fastify/request-context"
import { authConfig } from "@/app/config"

type Options = FastifyRegisterOptions<FastifyRequestContextOptions>

export const requestContextPluginOptions: Options = {
  hook: "preValidation",
  defaultStoreValues: authConfig.authStateDefaults,
}
