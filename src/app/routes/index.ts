import { RouteOptions } from "fastify"
import { login } from "./auth/login"

/**
 * register all routes here
 *
 */
export const routes: RouteOptions[] = [
  login,
]
