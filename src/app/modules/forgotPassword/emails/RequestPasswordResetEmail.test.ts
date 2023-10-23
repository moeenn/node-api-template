import { describe, it, expect } from "vitest"
import { RequestPasswordResetEmail } from "./RequestPasswordResetEmail"
import { appConfig } from "@/app/config"

describe("RequestPasswordResetEmail test", () => {
  it("email html has all provided fields", () => {
    const args = {
      resetToken: "http://site.com/reset",
    }

    const email = new RequestPasswordResetEmail(args)
    const html = email.html()

    expect(html.includes(appConfig.appName)).toBe(true)
    expect(html.includes(args.resetToken)).toBe(true)
  })
})
