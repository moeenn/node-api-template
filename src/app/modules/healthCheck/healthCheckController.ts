import { RouteShorthandOptionsWithHandler } from "fastify"
import { HealthCheckService } from "./healthCheckService"
import { hasRole, validateToken } from "@/core/server/middleware"
import { UserRole } from "@prisma/client"

export const HealthCheckController: Record<
  string,
  RouteShorthandOptionsWithHandler
> = {
  healthCheck: {
    handler: async () => {
      return await HealthCheckService.healthcheck()
    },
  },

  memoryUsage: {
    preValidation: [validateToken, hasRole(UserRole.ADMIN)],
    handler: async () => {
      return await HealthCheckService.memoryUsage()
    },
  },
}
