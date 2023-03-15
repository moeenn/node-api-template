import { RouteOptions } from "fastify"
import { HealthCheckService } from "@/app/services/HealthCheck.service"

export const healthCheck: RouteOptions = {
  url: "/health-check",
  method: "GET",
  handler: async () => {
    return await HealthCheckService.healthcheck()
  },
}
