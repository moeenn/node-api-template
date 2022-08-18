/**
 *  help in reading environment variables
 *  if the requested env variable is not set then error is thrown
*/
function env(key: string): string {
  const value = process.env[key]
  if (!value) {
    throw new Error(`env variable not set: ${key}`)
  }

  return value.trim()
}

export default env