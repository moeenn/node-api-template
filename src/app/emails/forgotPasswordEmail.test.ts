import { describe, it, expect } from "vitest"
import { ForgotPasswordEmail } from "./forgotPasswordEmail"
import { appConfig } from "@/app/config"

describe("ForgotPasswordEmail test", () => {
  it("email html has all provided fields", () => {
    const args = {
      resetToken: "http://site.com/reset",
    }

    const email = new ForgotPasswordEmail(args)
    const html = email.html()

    expect(html.includes(appConfig.appName)).toBe(true)
    expect(html.includes(args.resetToken)).toBe(true)
  })
})
