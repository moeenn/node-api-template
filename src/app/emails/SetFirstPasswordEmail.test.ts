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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_, value] of Object.entries(args)) {
      expect(html.includes(value)).toBe(true)
    }
  })
})
