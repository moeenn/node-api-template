import { describe, it, expect, afterAll } from "vitest"
import { Server } from "@/core/server"
import { db } from "@/core/database"
import { UserRole } from "@prisma/client"
import { Password } from "@/core/helpers"
import { AuthService } from "@/core/services/AuthService"

describe("updatePassword", () => {
  const server = Server.new()
  const url = "/api/user/update-password"
  const method = "POST"

  afterAll(() => server.close())

  it("valid request", async () => {
    /** setup */
    const user = await db.user.create({
      data: {
        email: "user@site.com",
        name: "User",
        role: UserRole.USER,
        password: {
          create: {
            hash: await Password.hash("some_random-password"),
          },
        },
      },
    })
    const authToken = await AuthService.generateLoginAuthToken(
      user.id,
      user.role,
    )

    /** test */
    const updatedPassword = "another-new-password-123123"
    const res = await server.inject({
      url,
      method,
      headers: {
        authorization: "Bearer " + authToken,
      },
      payload: {
        password: updatedPassword,
        confirmPassword: updatedPassword,
      },
    })
    expect(res.statusCode).toBe(200)

    const updatedUser = await db.user.findUnique({
      where: { id: user.id },
      include: { password: true },
    })

    const isHashValid = await Password.verify(
      updatedUser?.password?.hash ?? "",
      updatedPassword,
    )
    expect(isHashValid).toBe(true)

    /** cleanup */
    await db.user.delete({ where: { id: user.id } })
  })
})
