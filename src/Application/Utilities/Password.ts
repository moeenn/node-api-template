import crypto from "crypto"

/**
 *  hash & salt a cleartext password string
 * 
*/
function Hash(password: string): string {
  const salt: string = crypto.randomBytes(16).toString("hex")
  const hash: string = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex")

  return `${salt}__${hash}`
}

/**
 *  verify whether hash / salt combo matches with the cleartext password string
 * 
*/
function Verify(hashed: string, cleartext: string): boolean {
  const pieces = hashed.split("__")
  if (pieces.length !== 2) {
    return false
  }

  const [salt, hash] = pieces
  const computedHash = crypto
    .pbkdf2Sync(cleartext, salt, 1000, 64, `sha512`)
    .toString(`hex`)
    
  return computedHash === hash
}

export default {
  Hash,
  Verify,
} 
