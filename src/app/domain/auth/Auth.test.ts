import { describe, it, expect } from "vitest"
import { env, Random } from "@/core/helpers"
import { AuthService } from "./Auth.service"
import { AuthController } from "./Auth.controller"
import { UserService } from "@/app/domain/user"
import { UserRole } from "@prisma/client"
import { UserFactory } from "../user/User.factory"

describe("Auth", () => {
  it("generate and validate auth token", async () => {
    const userId = 300
    const userRole = UserRole.ADMIN
    const token = await AuthService.generateLoginAuthToken(userId, userRole)
    const result = await AuthService.validateLoginAuthToken(token)

    expect(result.userId).toBe(userId)
    expect(result.userRole).toBe(userRole)
  })

  it("generate auth and validate first password token", async () => {
    const token = await AuthService.generateLoginAuthToken(300, UserRole.ADMIN)
    await expect(() =>
      AuthService.validateFirstPasswordToken(token),
    ).rejects.toThrowError(/invalid/)
  })

  it("generate and validate first password token", async () => {
    const userId = 300
    const token = await AuthService.generateFirstPasswordToken(userId)
    const result = await AuthService.validateFirstPasswordToken(token)
    expect(result).toBe(userId)
  })

  it("generate first password and validate reset password token", async () => {
    const token = await AuthService.generateFirstPasswordToken(300)
    await expect(() =>
      AuthService.validatePasswordResetToken(token),
    ).rejects.toThrowError(/invalid/)
  })

  it("generate and validate password reset token", async () => {
    const userID = 300
    const token = await AuthService.generatePasswordResetToken(userID)
    const result = await AuthService.validatePasswordResetToken(token)
    expect(result).toBe(userID)
  })

  it("generate reset password and validate auth token", async () => {
    const token = await AuthService.generatePasswordResetToken(300)
    await expect(() =>
      AuthService.validateLoginAuthToken(token),
    ).rejects.toThrowError(/invalid/)
  })

  it("JWT_SECRET is set", async () => {
    const secret = env("JWT_SECRET")
    expect(secret).toBeTruthy()
  })

  it("login invalid credentials", async () => {
    const payload = {
      email: "some-random-email@site.com",
      password: await Random.string(10),
    }

    await expect(() => AuthController.login(payload)).rejects.toThrowError(
      /invalid/,
    )
  })

  it("login account not configured", async () => {
    const user = await UserFactory.createWithoutPassword()
    expect(user).toBeTruthy()

    const loginPayload = {
      email: UserFactory.data.email,
      password: await Random.string(10),
    }

    await expect(() => AuthController.login(loginPayload)).rejects.toThrowError(
      /not configured/,
    )

    /* cleanup */
    await UserService.removeUser(user)
  })
})
