import { RouteOptions } from "fastify"
import { HealthCheckService } from "@/app/services/HealthCheckService"

export const healthCheck: RouteOptions = {
  url: "/health-check",
  method: "GET",
  handler: async () => {
    return await HealthCheckService.healthcheck()
  },
}
