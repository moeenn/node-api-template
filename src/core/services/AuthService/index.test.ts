import { UserRole } from "@prisma/client"
import { describe, it, expect } from "vitest"
import { AuthService } from "./index"

describe("AuthService", () => {
  it("generate and validate login auth token", async () => {
    const loginToken = await AuthService.generateLoginAuthToken(
      "abc123",
      UserRole.USER,
    )

    const { userId, userRole } = await AuthService.validateLoginAuthToken(
      loginToken,
    )
    expect(userId).toBe("abc123")
    expect(userRole).toBe(UserRole.USER)
  })

  it("invalid login auth token", async () => {
    expect(() =>
      AuthService.validateLoginAuthToken("random-token"),
    ).rejects.toThrowError("invalid")
  })

  it("generate and validate first password token", async () => {
    const loginToken = await AuthService.generateFirstPasswordToken("abc123")
    const userId = await AuthService.validateFirstPasswordToken(loginToken)
    expect(userId).toBe("abc123")
  })

  it("invalid first password token", async () => {
    expect(() =>
      AuthService.validateFirstPasswordToken("random-token"),
    ).rejects.toThrowError("invalid")
  })

  it("generate and validate password reset token", async () => {
    const loginToken = await AuthService.generatePasswordResetToken("abc123")
    const userId = await AuthService.validatePasswordResetToken(loginToken)
    expect(userId).toBe("abc123")
  })

  it("invalid reset password token", async () => {
    expect(() =>
      AuthService.validatePasswordResetToken("random-token"),
    ).rejects.toThrowError("invalid")
  })
})
