import { describe, it, expect, afterAll } from "vitest"
import { db } from "@/core/database"
import { Password, Auth } from "@/core/helpers"
import { ResetForgottenPassword } from "@/app/modules/forgotPassword/forgotPasswordSchema"
import { faker } from "@faker-js/faker"
import { UserFactory } from "@/app/modules/user/userFactory"
import { PasswordFactory } from "@/app/modules/password/passwordFactory"
import { ForgotPasswordRouter } from "../forgotPasswordRouter"
import { Server } from "@/core/server"

describe("resetForgottenPassword", () => {
  const server = Server.newTestServer(ForgotPasswordRouter)
  const url = "/reset-password"
  const method = "POST"

  afterAll(() => server.close())

  it("valid request", async () => {
    /** setup */
    const user = await db.user.create({
      data: {
        ...UserFactory.make(),
        password: {
          create: await PasswordFactory.make(),
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
