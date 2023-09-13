import { RouteOptions } from "fastify"
import { HealthCheckController } from "@/app/modules/healthCheck/healthCheckController"
import { AuthController } from "@/app/modules/auth/authController"
import { ForgotPasswordController} from "@/app/modules/forgotPassword/forgotPasswordController"
import { UserController } from "@/app/modules/user/userController"

/**
 * register all routes here
 *
 */
export const routes: RouteOptions[] = [
  HealthCheckController.healthCheck,
  HealthCheckController.memoryUsage,
  AuthController.login,
  AuthController.refreshAuthToken,
  AuthController.setFirstPassword,
  ForgotPasswordController.requestPasswordReset,
  ForgotPasswordController.validatePasswordResetToken,
  ForgotPasswordController.resetForgottenPassword,
  UserController.getUserProfile,
  UserController.registerUser,
  UserController.setUserStatus,
  UserController.updateUserPassword,
  UserController.updateUserProfile,
  UserController.listUsers,
]
