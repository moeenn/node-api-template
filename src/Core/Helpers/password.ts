import * as argon2 from "argon2"

/**
 *  hash & salt a cleartext password string
 * 
*/
async function hash(password: string): Promise<string> {
  return await argon2.hash(password)
}

/**
 *  verify whether hash / salt combo matches with the cleartext password string
 * 
*/
async function verify(hashed: string, cleartext: string): Promise<boolean> {
  return await argon2.verify(hashed, cleartext)
}

export default {
  hash,
  verify,
} 
