import { RouteOptions } from "fastify"
import { HealthCheckService } from "./healthCheckService"
import { hasRole, validateToken } from "@/core/server/middleware"
import { UserRole } from "@prisma/client"

export const healthCheck: RouteOptions = {
  url: "/health-check",
  method: "GET",
  handler: async () => {
    return await HealthCheckService.healthcheck()
  },
}

export const memoryUsage: RouteOptions = {
  url: "/health-check/memory",
  method: "GET",
  preValidation: [validateToken, hasRole(UserRole.ADMIN)],
  handler: async () => {
    return await HealthCheckService.memoryUsage()
  },
}

export const HealthCheckController = {
  healthCheck,
  memoryUsage,
}
