import { authConfig } from "@/app/config"
import { JWT, env } from "@/core/helpers"
import { BadRequestException, ForbiddenException } from "@/core/exceptions"
import { UserRole } from "@prisma/client"

export function generateToken(
  type: keyof typeof authConfig.tokens,
): (userId: number) => Promise<string> {
  return async (userId: number): Promise<string> => {
    const jwtSecret = env("JWT_SECRET")
    const { scope, expiry } = authConfig.tokens[type]

    const token = await JWT.generate(jwtSecret, { userId, scope }, expiry)

    return token
  }
}

/**
 * this function is different from the generateToken function because it also
 * encodes the user role inside the token
 *
 */
export function generateLoginToken(
  type: keyof typeof authConfig.tokens,
): (userId: number, userRole: UserRole) => Promise<string> {
  return async (userId: number, userRole: string): Promise<string> => {
    const jwtSecret = env("JWT_SECRET")
    const { scope, expiry } = authConfig.tokens[type]

    const token = await JWT.generate(
      jwtSecret,
      { userId, scope, userRole },
      expiry,
    )
    return token
  }
}

export function validateToken(
  type: keyof typeof authConfig.tokens,
): (token: string) => Promise<number> {
  return async (token: string): Promise<number> => {
    const jwtPayload = await JWT.validate(env("JWT_SECRET"), token)

    const result = jwtPayload as { userId: number; scope: string }
    const scope = authConfig.tokens[type].scope

    if (!result.userId || !result.scope || result.scope !== scope) {
      throw BadRequestException("invalid password token")
    }

    return result.userId
  }
}

/**
 * this function is different from the generateToken function because it also
 * encodes the user role inside the token
 *
 */
export function validateLoginToken(
  type: keyof typeof authConfig.tokens,
): (token: string) => Promise<{ userId: number; userRole: string }> {
  return async (
    token: string,
  ): Promise<{ userId: number; userRole: string }> => {
    const jwtPayload = await JWT.validate(env("JWT_SECRET"), token)
    if (!jwtPayload) {
      throw ForbiddenException("invalid or expired token")
    }

    const result = jwtPayload as {
      userId: number
      scope: string
      userRole: string
    }
    const scope = authConfig.tokens[type].scope

    if (!result.userId || !result.scope || result.scope !== scope) {
      throw BadRequestException("invalid password token")
    }

    return {
      userId: result.userId,
      userRole: result.userRole,
    }
  }
}
