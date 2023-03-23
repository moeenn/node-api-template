import { describe, it, expect, afterAll } from "vitest"
import { Server } from "@/core/server" 
import { database } from "@/core/database"
import { UserRole } from "@prisma/client"
import { AuthService } from "@/app/services/AuthService"
import { Password } from "@/core/helpers"

describe("resetForgottenPassword", () => {
  const server = Server.new()
  const url = "/api/forgot-password/reset-password"
  const method = "POST"

  afterAll(() => server.close())

  it("valid request", async () => {
    /** setup */
    const user = await database.user.create({
      data: {
        email: "user@site.com",
        name: "User",
        role: UserRole.SUB_CONTRACTOR,
        password: {
          create: {
            hash: await Password.hash("some_random_password123123")
          }
        }
      }
    })
    const resetToken = await AuthService.generatePasswordResetToken(user.id)

    /** test */
    const newPassword = "updated-password-12000"
    const res = await server.inject({
      url,
      method,
      payload: {
        token: resetToken,
        password: newPassword,
        confirmPassword: newPassword,
      }
    })
    expect(res.statusCode).toBe(200)

    const updatedUser = await database.user.findUnique({ 
      where: { id: user.id },
      include: { password: true }
    })

    const isHashValid = await Password.verify(
      updatedUser?.password?.hash ?? "",
      newPassword,
    )
    expect(isHashValid)

    /** cleanup */
    await database.user.delete({ where: { id: user.id }})
  })
})