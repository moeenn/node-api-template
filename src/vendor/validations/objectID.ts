export { z } from "zod"

/**
 *  mongodb object id validation
 *
 */
export const objectID = {
  handler(value: unknown): boolean {
    const pattern = /^[0-9a-fA-F]{24}$/
    return pattern.test(`${value}`)
  },
  options: {
    message: "invalid mongodb object id",
  },
}
