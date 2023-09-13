import { RouteOptions } from "fastify"
import { HealthCheckController } from "@/app/modules/healthCheck/healthCheckController"
import { login } from "./auth/login/login"
import { refreshAuthToken } from "./auth/refreshAuthToken/refreshAuthToken"
import { setFirstPassword } from "./auth/setFirstPassword/setFirstPassword"
import { requestPasswordReset } from "./forgotPassword/requestPasswordReset/requestPasswordReset"
import { validatePasswordResetToken } from "./forgotPassword/validatePasswordResetToken/validatePasswordResetToken"
import { resetForgottenPassword } from "./forgotPassword/resetForgottenPassword/resetForgottenPassword"
import { UserController } from "@/app/modules/user/userController"

/**
 * register all routes here
 *
 */
export const routes: RouteOptions[] = [
  HealthCheckController.healthCheck,
  HealthCheckController.memoryUsage,
  login,
  refreshAuthToken,
  setFirstPassword,
  requestPasswordReset,
  validatePasswordResetToken,
  resetForgottenPassword,
  UserController.getUserProfile,
  UserController.registerUser,
  UserController.setUserStatus,
  UserController.updateUserPassword,
  UserController.updateUserProfile,
  UserController.listUsers,
]
