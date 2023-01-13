import { RouteOptions } from "@/vendor/entities/server"
import { validateToken, hasRole } from "@/vendor/middleware"
import { healthCheckController } from "@/domain/healthCheck"

export const memoryUsage: RouteOptions = {
  url: "/health-check/memory",
  method: "GET",
  preValidation: [validateToken, hasRole("admin")],
  handler: async () => {
    const usage = await healthCheckController.memoryUsage()
    return usage
  },
}
