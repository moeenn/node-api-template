import jwt, { JSONMap } from "njwt"

export const JWT = {
  /**
   * generate a JWT and sign using a secret key
   *
   */
  async generate(
    secret: string,
    claims: JSONMap,
    expiredInMinutes?: number,
  ): Promise<{ token: string; expiry: number }> {
    const token = jwt.create(claims, secret)

    const expiry = expiredInMinutes
      ? new Date().getTime() + 60 * 1000 * expiredInMinutes
      : 0

    token.setExpiration(expiry)

    return {
      token: token.compact(),
      expiry,
    }
  },

  /**
   * check if JWT is valid and extract the payload
   *
   */
  async validate(secret: string, token: string): Promise<unknown | undefined> {
    try {
      return jwt.verify(token, secret)?.body
    } catch (err) {
      return
    }
  },
}
