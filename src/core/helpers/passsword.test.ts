import { describe, it, expect } from "vitest"
import { Password } from "./password"

describe("Password helper", () => {
  it("valid password hashing and checking", async () => {
    const pwd = "random_password_300"
    const hash = await Password.hash(pwd)
    const isValid = await Password.verify(hash, pwd)

    expect(isValid).toBe(true)
  })

  it("invalid password hashing and checking", async () => {
    const pwd = "random_password"
    const hash = await Password.hash(pwd)
    const isValid = await Password.verify(hash, "ascascc")

    expect(isValid).toBe(false)
  })

  it("weak password strength test", async () => {
    const weak = await Password.checkStrength("1231231")
    expect(weak.strong).toBe(false)
    expect(weak.errors.length).toBeTruthy()
  })

  it("strong password strength test", async () => {
    const weak = await Password.checkStrength("!@#!@cas*CBCL32")
    expect(weak.strong).toBe(true)
    expect(weak.errors.length).toBeFalsy()
  })
})
