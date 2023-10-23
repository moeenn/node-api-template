import { describe, it, expect, afterAll } from "vitest"
import { db } from "@/core/database"
import { Password, Auth } from "@/core/helpers"
import { UpdateUserPassword } from "@/app/modules/password/passwordSchema"
import { faker } from "@faker-js/faker"
import { UserFactory } from "@/app/modules/user/userFactory"
import { PasswordFactory } from "@/app/modules/password/passwordFactory"
import { PasswordRouter } from "../passwordRouter"
import { Server } from "@/core/server"

describe("updateUserPassword", () => {
  const server = Server.newTestServer(PasswordRouter)
  const url = "/update"
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

    const authToken = await Auth.generateLoginAuthToken(user.id, user.role)

    /** test */
    const updatedPassword = faker.string.alphanumeric({ length: 10 })
    const res = await server.inject({
      url,
      method,
      headers: {
        authorization: "Bearer " + authToken.token,
      },
      payload: {
        password: updatedPassword,
        confirmPassword: updatedPassword,
      } as UpdateUserPassword,
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
