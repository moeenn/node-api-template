import argon2 from "argon2"

export const Password = {
  /**
   *  hash & salt a cleartext password string
   *
   */
  async hash(password: string): Promise<string> {
    return await argon2.hash(password)
  },

  /**
   *  verify whether hash / salt combo matches with the cleartext password string
   *
   */
  async verify(hashed: string, cleartext: string): Promise<boolean> {
    return await argon2.verify(hashed, cleartext)
  },
}
