import { z } from "zod"

/**
 *  mongodb object id validation
 *
 */
const objectid = {
  handler(value: unknown): boolean {
    const pattern = /^[0-9a-fA-F]{24}$/
    return pattern.test(`${value}`)
  },
  options: {
    message: "invalid mongodb object id",
  },
}

/**
 *  confirm whether 'password' and 'confirm_password' fields match
 *
 */
const confirmPassword = {
  handler(data: { password: string; confirm_password: string }): boolean {
    return data.password === data.confirm_password
  },
  options: {
    message: "password confirmation failed",
  },
}

export { z, objectid, confirmPassword }
