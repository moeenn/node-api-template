import crypto from "node:crypto"

export const Random = {
  /**
   * generate a random string of provided length
   *
   */
  async string(bytes: number): Promise<string> {
    return crypto.randomBytes(bytes).toString("hex")
  },

  /**
   * generate a random number in the provided range
   *
   */
  async int(min: number, max: number): Promise<number> {
    return crypto.randomInt(min, max)
  },

  /**
   * generate a fixed length numeric pin
   *
   */
  async pin(length: number): Promise<string> {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    return [...Array(length)].map((_) => crypto.randomInt(0, 9)).join("")
  },
}
