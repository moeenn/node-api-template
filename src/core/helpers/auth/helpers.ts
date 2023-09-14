import { authConfig } from "@/app/config"
import { JWT } from "@/core/helpers"
import {
  BadRequestException,
  ForbiddenException,
} from "@/core/entities/exceptions"
import { UserRole } from "@prisma/client"

type TokenResult = { token: string; expiry: number }

export function generateGeneralToken(
  type: keyof typeof authConfig.tokens,
): (userId: number) => Promise<TokenResult> {
  return async (userId: number): Promise<TokenResult> => {
    const { scope, expiry } = authConfig.tokens[type]
    const claims = {
      sub: userId,
      scope,
    }

    return await JWT.generate(authConfig.jwt.secret, claims, expiry)
  }
}

/**
 * this function is different from the generateToken function because it also
 * encodes the user role inside the token
 *
 */
export function generateLoginToken(
  type: keyof typeof authConfig.tokens,
): (userId: number, userRole: UserRole) => Promise<TokenResult> {
  return async (userId: number, userRole: UserRole): Promise<TokenResult> => {
    const tokenConfig = authConfig.tokens[type]

    const claims = {
      sub: userId,
      scope: tokenConfig.scope,
      role: userRole,
    }

    return await JWT.generate(authConfig.jwt.secret, claims, tokenConfig.expiry)
  }
}

export function validateGeneralToken(
  type: keyof typeof authConfig.tokens,
): (token: string) => Promise<number> {
  return async (token): Promise<number> => {
    const jwtPayload = await JWT.validate(authConfig.jwt.secret, token)

    const result = jwtPayload as { sub?: number; scope?: string }
    const { scope } = authConfig.tokens[type]

    if (!result || !result.sub || !result.scope || result.scope !== scope) {
      throw BadRequestException("invalid auth token")
    }

    return result.sub
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
    const jwtPayload = await JWT.validate(authConfig.jwt.secret, token)
    if (!jwtPayload) {
      throw ForbiddenException("invalid or expired token")
    }

    const result = jwtPayload as {
      sub: number
      scope: string
      role: string
    }
    const { scope } = authConfig.tokens[type]

    if (
      !result ||
      !result.sub ||
      !result.role ||
      !result.scope ||
      result.scope !== scope
    ) {
      throw BadRequestException("invalid password token")
    }

    return {
      userId: result.sub,
      userRole: result.role,
    }
  }
}
