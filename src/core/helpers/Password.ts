import argon2 from "argon2"
import owasp, { TestResult } from "owasp-password-strength-test"

export const Password = {
  /**
   * hash & salt a cleartext password string
   *
   */
  async hash(password: string): Promise<string> {
    return await argon2.hash(password)
  },

  /**
   * verify whether hash / salt combo matches with the cleartext password string
   *
   */
  async verify(hashed: string, cleartext: string): Promise<boolean> {
    return await argon2.verify(hashed, cleartext)
  },

  /**
   * check strength of a cleartext password
   *
   */
  async checkStrength(cleartext: string): Promise<TestResult> {
    return owasp.test(cleartext)
  },
}
