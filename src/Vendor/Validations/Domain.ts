export { z } from "zod"

/**
 *  validate domain names
 *
 */
export const Domain = {
  handler(value: unknown): boolean {
    const pattern =
      /* eslint-disable-next-line */
      /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/
    return pattern.test(`${value}`)
  },
  options: {
    message: "invalid domain name",
  },
}
