import { RouteOptions } from "@/core/server"
import { validateToken, hasRole } from "@/core/server/middleware"
import { UserRole } from "@prisma/client"
import { HealthCheckController } from "./HealthCheck.controller"

const healthCheck: RouteOptions = {
  url: "/health-check",
  method: "GET",
  handler: async () => {
    const result = await HealthCheckController.healthcheck()
    return result
  },
}

const memoryUsage: RouteOptions = {
  url: "/health-check/memory",
  method: "GET",
  preValidation: [validateToken, hasRole(UserRole.ADMIN)],
  handler: async () => {
    const usage = await HealthCheckController.memoryUsage()
    return usage
  },
}

export const HealthCheckRoutes: RouteOptions[] = [healthCheck, memoryUsage]
