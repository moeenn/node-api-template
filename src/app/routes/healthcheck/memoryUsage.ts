import { RouteOptions } from "fastify"
import { validateToken, hasRole } from "@/core/server/middleware"
import { UserRole } from "@prisma/client"
import { HealthCheckService } from "@/app/services/HealthCheckService"

export const memoryUsage: RouteOptions = {
  url: "/health-check/memory",
  method: "GET",
  preValidation: [validateToken, hasRole(UserRole.ADMIN)],
  handler: async () => {
    return await HealthCheckService.memoryUsage()
  },
}
