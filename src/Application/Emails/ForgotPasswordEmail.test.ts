import { describe, it, expect } from "vitest"
import { ForgotPasswordEmail } from "./ForgotPasswordEmail"

describe("ForgotPasswordEmail test", () => {
  it("email html has all provided fields", () => {
    const args = {
      appName: "Sample App",
      resetLink: "http://site.com/reset",
    }

    const email = new ForgotPasswordEmail(args)
    const html = email.html()

    expect(html.includes(args.appName)).toBe(true)
    expect(html.includes(args.resetLink)).toBe(true)
  })
})
