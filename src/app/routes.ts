import { RouteOptions } from "fastify"
import { HealthCheckController } from "@/app/modules/healthCheck/healthCheckController"
import { AuthController } from "@/app/modules/auth/authController"
import { ForgotPasswordController } from "@/app/modules/forgotPassword/forgotPasswordController"
import { UserController } from "@/app/modules/user/userController"
import { PasswordController } from "./modules/password/passwordController"

/**
 * register all routes here
 *
 */
export const routes: RouteOptions[] = [
  HealthCheckController.healthCheck,
  HealthCheckController.memoryUsage,
  AuthController.login,
  AuthController.refreshAuthToken,
  ForgotPasswordController.requestPasswordReset,
  ForgotPasswordController.validatePasswordResetToken,
  ForgotPasswordController.resetForgottenPassword,
  PasswordController.setFirstPassword,
  PasswordController.updateUserPassword,
  PasswordController.checkPasswordStrength,
  UserController.getUserProfile,
  UserController.registerUser,
  UserController.setUserStatus,
  UserController.updateUserProfile,
  UserController.listUsers,
]
