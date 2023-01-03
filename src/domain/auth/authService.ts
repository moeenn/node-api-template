import { authConfig } from "@/app/config"
import { JWT, env } from "@/vendor/helpers"
import { BadRequestException } from "@/vendor/exceptions"

function generateToken(
  type: keyof typeof authConfig.tokens,
): (userID: number) => Promise<string> {
  return async (userID: number): Promise<string> => {
    const jwtSecret = env("JWT_SECRET")
    const { scope, expiry } = authConfig.tokens[type]

    const token = await JWT.generate(jwtSecret, { userID, scope }, expiry)

    return token
  }
}

function validateToken(
  type: keyof typeof authConfig.tokens,
): (token: string) => Promise<number> {
  return async (token: string): Promise<number> => {
    const jwtPayload = await JWT.validate(env("JWT_SECRET"), token)

    const result = jwtPayload as { userID: number; scope: string }
    const scope = authConfig.tokens[type].scope

    if (!result.userID || !result.scope || result.scope !== scope) {
      throw BadRequestException("invalid password token")
    }

    return result.userID
  }
}

const generateLoginAuthToken = generateToken("auth")
const validateLoginAuthToken = validateToken("auth")

const generateFirstPasswordToken = generateToken("firstPassword")
const validateFirstPasswordToken = validateToken("firstPassword")

const generatePasswordResetToken = generateToken("passwordReset")
const validatePasswordResetToken = validateToken("passwordReset")

export const authService = {
  generateLoginAuthToken,
  validateLoginAuthToken,
  generateFirstPasswordToken,
  validateFirstPasswordToken,
  generatePasswordResetToken,
  validatePasswordResetToken,
}
