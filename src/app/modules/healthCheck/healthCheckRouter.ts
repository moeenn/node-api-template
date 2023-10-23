import { FastifyPlugin } from "@/core/server/plugins"
import { HealthCheckController } from "./healthCheckController"

export const HealthCheckRouter: FastifyPlugin = (app, _opts, next) => {
  app.get("/", HealthCheckController.healthCheck)
  app.get("/memory", HealthCheckController.memoryUsage)

  next()
}
