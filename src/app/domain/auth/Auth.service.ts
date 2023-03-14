import {
  generateToken,
  generateLoginToken,
  validateToken,
  validateLoginToken,
} from "./Auth.helpers"

export const AuthService = {
  generateLoginAuthToken: generateLoginToken("auth"),
  validateLoginAuthToken: validateLoginToken("auth"),

  generateFirstPasswordToken: generateToken("firstPassword"),
  validateFirstPasswordToken: validateToken("firstPassword"),

  generatePasswordResetToken: generateToken("passwordReset"),
  validatePasswordResetToken: validateToken("passwordReset"),
}
