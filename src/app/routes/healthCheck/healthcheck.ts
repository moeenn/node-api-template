import { RouteOptions } from "@/vendor/entities/server"
import { healthCheckController } from "@/domain/healthCheck"

export const healthCheck: RouteOptions = {
  url: "/health-check",
  method: "GET",
  handler: async () => {
    const result = await healthCheckController.healthcheck()
    return result
  },
}
