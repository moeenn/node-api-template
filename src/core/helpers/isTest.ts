import process from "node:process"

/**
 * check if system is currently running tests
 *
 */
export function isTest(): boolean {
  return process.env.NODE_ENV === "test"
}
