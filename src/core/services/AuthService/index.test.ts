import { UserRole } from "@prisma/client"
import { describe, it, expect } from "vitest"
import { AuthService } from "./index"

describe("AuthService", () => {
  it("generate and validate login auth token", async () => {
    const loginToken = await AuthService.generateLoginAuthToken(
      10000,
      UserRole.ADMIN,
    )

    const { userId, userRole } = await AuthService.validateLoginAuthToken(
      loginToken.token,
    )
    expect(userId).toBe(10000)
    expect(userRole).toBe(UserRole.ADMIN)
  })

  it("invalid login auth token", async () => {
    expect(() =>
      AuthService.validateLoginAuthToken("random-token"),
    ).rejects.toThrowError("invalid")
  })

  it("generate and validate first password token", async () => {
    const loginToken = await AuthService.generateFirstPasswordToken(10000)
    const userId = await AuthService.validateFirstPasswordToken(
      loginToken.token,
    )
    expect(userId).toBe(10000)
  })

  it("invalid first password token", async () => {
    expect(() =>
      AuthService.validateFirstPasswordToken("random-token"),
    ).rejects.toThrowError("invalid")
  })

  it("generate and validate password reset token", async () => {
    const loginToken = await AuthService.generatePasswordResetToken(10000)
    const userId = await AuthService.validatePasswordResetToken(
      loginToken.token,
    )
    expect(userId).toBe(10000)
  })

  it("invalid reset password token", async () => {
    expect(() =>
      AuthService.validatePasswordResetToken("random-token"),
    ).rejects.toThrowError("invalid")
  })
})
