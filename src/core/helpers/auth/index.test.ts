import { UserRole } from "@prisma/client"
import { describe, it, expect } from "vitest"
import { Auth } from "./index"

describe("Auth", () => {
  it("generate and validate login auth token", async () => {
    const loginToken = await Auth.generateLoginAuthToken(10000, UserRole.ADMIN)

    const { userId, userRole } = await Auth.validateLoginAuthToken(
      loginToken.token,
    )
    expect(userId).toBe(10000)
    expect(userRole).toBe(UserRole.ADMIN)
  })

  it("invalid login auth token", async () => {
    expect(() =>
      Auth.validateLoginAuthToken("random-token"),
    ).rejects.toThrowError("invalid")
  })

  it("generate and validate first password token", async () => {
    const loginToken = await Auth.generateFirstPasswordToken(10000)
    const userId = await Auth.validateFirstPasswordToken(loginToken.token)
    expect(userId).toBe(10000)
  })

  it("invalid first password token", async () => {
    expect(() =>
      Auth.validateFirstPasswordToken("random-token"),
    ).rejects.toThrowError("invalid")
  })

  it("generate and validate password reset token", async () => {
    const loginToken = await Auth.generatePasswordResetToken(10000)
    const userId = await Auth.validatePasswordResetToken(loginToken.token)
    expect(userId).toBe(10000)
  })

  it("invalid reset password token", async () => {
    expect(() =>
      Auth.validatePasswordResetToken("random-token"),
    ).rejects.toThrowError("invalid")
  })
})
