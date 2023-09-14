import { Server } from "@/core/server"
import { describe, it, expect, afterAll } from "vitest"
import { CheckPasswordStrength } from "@/app/modules/password/password.schema"
import { TestResult } from "owasp-password-strength-test"

describe("checkPasswordStrength", () => {
  const server = Server.new()
  const url = "/api/password/check-strength"
  const method = "POST"

  afterAll(() => server.close())

  it("strong password", async () => {
    const res = await server.inject({
      url,
      method,
      payload: {
        password: "Wvx.#$1Hfv&s^33",
      } as CheckPasswordStrength
    })

    expect(res.statusCode).toBe(200)
    const body = JSON.parse(res.body) as TestResult

    expect(body.strong).toBe(true)
    expect(body.errors.length).toBeFalsy()
  })

  it("weak password", async () => {
    const res = await server.inject({
      url,
      method,
      payload: {
        password: "abc123",
      } as CheckPasswordStrength
    })

    expect(res.statusCode).toBe(200)
    const body = JSON.parse(res.body) as TestResult

    expect(body.strong).toBe(false)
    expect(body.errors.length).toBeTruthy()
  })
})