import crypto from "crypto"

/**
 *  generate a random string of provided length
 */
function string(bytes: number): string {
  return crypto.randomBytes(bytes).toString("hex")
}

export const Random = {
  string,
}
