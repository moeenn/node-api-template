import { FastifyPlugin } from "@/core/server/plugins"
import { HealthCheckRouter } from "./modules/healthCheck/healthCheckRouter"
import { AuthRouter } from "./modules/auth/authRouter"
import { ForgotPasswordRouter } from "./modules/forgotPassword/forgotPasswordRouter"
import { PasswordRouter } from "./modules/password/passwordRouter"
import { UserRouter } from "./modules/user/userRouter"

/**
 * Register all module routers here
 *
 */
export const routers = new Map<string, FastifyPlugin>([
  ["/health-check", HealthCheckRouter],
  ["/auth", AuthRouter],
  ["/forgot-password", ForgotPasswordRouter],
  ["/password", PasswordRouter],
  ["/user", UserRouter],
])
