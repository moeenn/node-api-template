import bcrypt from "bcrypt"

/**
 *  hash & salt a cleartext password string
 * 
*/
async function hash(password: string): Promise<string> {
  const salt: string = await bcrypt.genSalt(10)
  const hash: string = await bcrypt.hash(password, salt)

  return hash
}

/**
 *  verify whether hash / salt combo matches with the cleartext password string
 * 
*/
async function verify(hashed: string, cleartext: string): Promise<boolean> {
  return await bcrypt.compare(cleartext, hashed)
} 

export default {
  hash,
  verify,
}