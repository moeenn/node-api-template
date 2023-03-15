import { RouteOptions } from "fastify"
import { healthCheck } from "./healthcheck/healthcheck"
import { memoryUsage } from "./healthcheck/memoryUsage"
import { login } from "./auth/login"
import { setFirstPassword } from "./auth/setFirstPassword"

/**
 * register all routes here
 *
 */
export const routes: RouteOptions[] = [
  healthCheck,
  memoryUsage,
  login,
  setFirstPassword,
]
