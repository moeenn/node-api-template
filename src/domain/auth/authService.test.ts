import { describe, it, expect } from "vitest"
import { throws } from "@/vendor/testing"
import { authService } from "./authService"

describe("authService", () => {
  it("generate and validate auth token", async () => {
    const userID = 300
    const token = await authService.generateLoginAuthToken(userID)
    const result = await authService.validateLoginAuthToken(token)
    expect(result).toBe(userID)
  })

  it("generate auth and validate first password token", async () => {
    const token = await authService.generateLoginAuthToken(300)
    const isError = await throws(
      async () => await authService.validateFirstPasswordToken(token),
      "invalid",
    )
    expect(isError).toBe(true)
  })

  it("generate and validate first password token", async () => {
    const userID = 300
    const token = await authService.generateFirstPasswordToken(userID)
    const result = await authService.validateFirstPasswordToken(token)
    expect(result).toBe(userID)
  })

  it("generate first password and validate reset password token", async () => {
    const token = await authService.generateFirstPasswordToken(300)
    const isError = await throws(
      async () => await authService.validatePasswordResetToken(token),
      "invalid",
    )
    expect(isError).toBe(true)
  })

  it("generate and validate password reset token", async () => {
    const userID = 300
    const token = await authService.generatePasswordResetToken(userID)
    const result = await authService.validatePasswordResetToken(token)
    expect(result).toBe(userID)
  })

  it("generate reset password and validate auth token", async () => {
    const token = await authService.generatePasswordResetToken(300)
    const isError = await throws(
      async () => await authService.validateLoginAuthToken(token),
      "invalid",
    )
    expect(isError).toBe(true)
  })
})
