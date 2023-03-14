import { FastifyRequest } from "fastify"
import { serverConfig } from "@/app/config"

function rateLimitExceedHandler() {
  return (
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    _req: FastifyRequest,
    context: { after: string; max: number; ttl: number },
  ) => {
    return {
      code: 429,
      error: "too many requests",
      message: `exceeded limit of ${context.max} requests per ${context.after}`,
      date: Date.now(),
      expiresIn: context.ttl, // milliseconds
    }
  }
}

export const rateLimitPluginOptions = {
  ...serverConfig.rateLimit,
  errorResponseBuilder: rateLimitExceedHandler(),
}
