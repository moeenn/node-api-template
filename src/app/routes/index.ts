import { userRegister } from "./user/userRegister"
import { userLogin } from "./auth/userLogin"
import { adminLogin } from "./auth/adminLogin"
import { setFirstPassword } from "./auth/setFirstPassword"
import { getUserProfile } from "./user/getUserProfile"
import { approveDisapproveUser } from "./user/approveDisapproveUser"
import { removeUser } from "./user/removeUser"
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
  getUserProfile,
  approveDisapproveUser,
  removeUser,
  requestPasswordReset,
  validatePasswordResetToken,
  resetForgottenPassword,
]
