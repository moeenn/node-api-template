import { describe, it, expect } from "vitest"
import { SetFirstPasswordEmail } from "./SetFirstPasswordEmail"

describe("SetFirstPasswordEmail test", () => {
  it("email template has all provided fields", () => {
    const args = {
      appName: "Sample app",
      frontendURL: "http://site.com/",
      resetPath: "path/to/setup",
      resetToken: "123123123",
    }

    const email = new SetFirstPasswordEmail(args)
    const html = email.html()

    expect(html.includes(args.appName)).toBe(true)
    expect(html.includes(args.frontendURL)).toBe(true)
    expect(html.includes(args.resetPath)).toBe(true)
    expect(html.includes(args.resetToken)).toBe(true)
  })
})
