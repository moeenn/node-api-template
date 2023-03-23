import { describe, it, expect, afterAll } from "vitest"
import { Server } from "@/core/server" 
import { database } from "@/core/database"
import { UserRole } from "@prisma/client"
import { AuthService } from "@/app/services/AuthService"

describe("validatePasswordResetToken", () => {
  const server = Server.new()
  const url = "/api/forgot-password/validate-reset-token"
  const method = "POST"

  afterAll(() => server.close())

  it("valid request", async () => {
    /** setup */
    const user = await database.user.create({
      data: {
        email: "user@site.com",
        name: "User",
        role: UserRole.SUB_CONTRACTOR,
      }
    })
    const resetToken = await AuthService.generatePasswordResetToken(user.id)

    /** test */
    const res = await server.inject({
      url,
      method,
      payload: {
        token: resetToken,
      }
    })
    expect(res.statusCode).toBe(200)

    const body = JSON.parse(res.body)
    expect(body.isValid).toBe(true)

    /** cleanup */
    await database.user.delete({ where: { id: user.id }})
  })
})