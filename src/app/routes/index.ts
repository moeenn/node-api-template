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
import { createSiteUser } from "./user/createSiteUser/createSiteUser"
import { setUserStatus } from "./user/setUserStatus/setUserStatus"
import { updatePassword } from "./user/updatePassword/updatePassword"
import { updateUserProfile } from "./user/updateUserProfile/updateUserProfile"


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
  createSiteUser,
  setUserStatus,
  updatePassword,
  updateUserProfile,
]
