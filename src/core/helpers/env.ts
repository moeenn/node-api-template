/**
 * help in reading environment variables
 * if the requested env variable is not set then error is thrown
 */
export function env(key: string): string {
  const value = process.env[key]
  if (!value) {
    throw new Error(`env variable not set: ${key}`)
  }

  return value.trim()
}
