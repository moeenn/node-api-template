import {
  generateLoginToken,
  generateToken,
  validateLoginToken,
  validateToken,
} from "./helpers"

export const AuthService = {
  generateLoginAuthToken: generateLoginToken("auth"),
  validateLoginAuthToken: validateLoginToken("auth"),

  generateFirstPasswordToken: generateToken("firstPassword"),
  validateFirstPasswordToken: validateToken("firstPassword"),

  generatePasswordResetToken: generateToken("passwordReset"),
  validatePasswordResetToken: validateToken("passwordReset"),
}
