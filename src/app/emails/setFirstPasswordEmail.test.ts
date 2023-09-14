import { describe, it, expect } from "vitest"
import { SetFirstPasswordEmail } from "./setFirstPasswordEmail"
import { appConfig } from "@/app/config"

describe("SetFirstPasswordEmail test", () => {
  it("email template has all provided fields", () => {
    const args = {
      passwordToken: "123123123",
    }

    const email = new SetFirstPasswordEmail(args)
    const html = email.html()

    expect(html.includes(appConfig.appName)).toBe(true)
    expect(html.includes(args.passwordToken)).toBe(true)
  })
})
