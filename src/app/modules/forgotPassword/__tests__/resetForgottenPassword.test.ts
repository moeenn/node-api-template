import { describe, it, expect, afterAll } from "vitest"
import { Server } from "@/core/server"
import { db } from "@/core/database"
import { UserRole } from "@prisma/client"
import { Password, Auth } from "@/core/helpers"
import { ResetForgottenPassword } from "@/app/modules/forgotPassword/forgotPassword.schema"
import { faker } from "@faker-js/faker"

describe("resetForgottenPassword", () => {
  const server = Server.new()
  const url = "/api/forgot-password/reset-password"
  const method = "POST"

  afterAll(() => server.close())

  it("valid request", async () => {
    /** setup */
    const user = await db.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.internet.userName(),
        role: UserRole.USER,
        password: {
          create: {
            hash: await Password.hash(
              faker.string.alphanumeric({ length: 10 }),
            ),
          },
        },
      },
    })
    const resetToken = await Auth.generatePasswordResetToken(user.id)

    /** test */
    const newPassword = faker.string.alphanumeric({ length: 10 })
    const res = await server.inject({
      url,
      method,
      payload: {
        token: resetToken.token,
        password: newPassword,
        confirmPassword: newPassword,
      } as ResetForgottenPassword,
    })
    expect(res.statusCode).toBe(200)

    const updatedUser = await db.user.findUnique({
      where: { id: user.id },
      include: { password: true },
    })

    const isHashValid = await Password.verify(
      updatedUser?.password?.hash ?? "",
      newPassword,
    )
    expect(isHashValid)

    /** cleanup */
    await db.user.delete({ where: { id: user.id } })
  })
})
