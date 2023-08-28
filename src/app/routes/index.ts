import { RouteOptions } from "fastify"
import { healthCheck } from "./healthcheck/healthcheck"
import { memoryUsage } from "./healthcheck/memoryUsage/memoryUsage"
import { login } from "./auth/login/login"
import { refreshAuthToken } from "./auth/refreshAuthToken/refreshAuthToken"
import { setFirstPassword } from "./auth/setFirstPassword/setFirstPassword"
import { requestPasswordReset } from "./forgotPassword/requestPasswordReset/requestPasswordReset"
import { validatePasswordResetToken } from "./forgotPassword/validatePasswordResetToken/validatePasswordResetToken"
import { resetForgottenPassword } from "./forgotPassword/resetForgottenPassword/resetForgottenPassword"
import { getUserProfile } from "./user/getUserProfile/getUserProfile"
import { registerUser } from "./user/registerUser/registerUser"
import { setUserStatus } from "./user/setUserStatus/setUserStatus"
import { updatePassword } from "./user/updatePassword/updatePassword"
import { updateUserProfile } from "./user/updateUserProfile/updateUserProfile"
import { listUsers } from "./user/listUsers/listUsers"

/**
 * register all routes here
 *
 */
export const routes: RouteOptions[] = [
  healthCheck,
  memoryUsage,
  login,
  refreshAuthToken,
  setFirstPassword,
  requestPasswordReset,
  validatePasswordResetToken,
  resetForgottenPassword,
  getUserProfile,
  registerUser,
  setUserStatus,
  updatePassword,
  updateUserProfile,
  listUsers,
]
