import { userRegister } from "./user/userRegister"
import { userLogin } from "./auth/userLogin"
import { adminLogin } from "./auth/adminLogin"
import { setFirstPassword } from "./auth/setFirstPassword"
import { logout } from "./auth/logout"
import { getUserProfile } from "./user/getUserProfile"
import { approveDisapproveUser } from "./user/approveDisapproveUser"
import { requestPasswordReset } from "./forgetPassword/requestPasswordReset"
import { validatePasswordResetToken } from "./forgetPassword/validatePasswordResetToken"
import { resetForgottenPassword } from "./forgetPassword/resetForgottenPassword"

/**
 *  register all routes here
 *
 */
export const routes = [
  userRegister,
  userLogin,
  adminLogin,
  setFirstPassword,
  logout,
  getUserProfile,
  approveDisapproveUser,
  requestPasswordReset,
  validatePasswordResetToken,
  resetForgottenPassword,
]
