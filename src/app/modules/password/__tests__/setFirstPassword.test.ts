import { describe, it, expect, afterAll } from "vitest"
import { db } from "@/core/database"
import { Password, Auth } from "@/core/helpers"
import { SetFirstPassword } from "@/app/modules/password/passwordSchema"
import { faker } from "@faker-js/faker"
import { UserFactory } from "@/app/modules/user/userFactory"
import { PasswordFactory } from "@/app/modules/password/passwordFactory"
import { PasswordRouter } from "../passwordRouter"
import { Server } from "@/core/server"

describe("setFirstPassword", () => {
  const server = Server.newTestServer(PasswordRouter)
  const url = "/create"
  const method = "POST"

  afterAll(() => server.close())

  it("valid configure request", async () => {
    /** setup */
    const user = await db.user.create({
      data: UserFactory.make(),
    })
    const firstPasswordToken = await Auth.generateFirstPasswordToken(user.id)

    /** test */
    const password = faker.string.alphanumeric({ length: 10 })
    const res = await server.inject({
      url,
      method,
      payload: {
        passwordToken: firstPasswordToken.token,
        password,
        confirmPassword: password,
      } as SetFirstPassword,
    })
    expect(res.statusCode).toBe(200)

    const updatedUser = await db.user.findUnique({
      where: { id: user.id },
      include: { password: true },
    })
    expect(updatedUser?.password).toBeTruthy()

    const isHashCorrect = await Password.verify(
      updatedUser?.password?.hash ?? "",
      password,
    )

    expect(isHashCorrect).toBe(true)

    /** cleanup */
    await db.user.delete({ where: { id: user.id } })
  })

  it("account already configured", async () => {
    /** setup */
    const password = faker.string.alphanumeric({ length: 10 })
    const user = await db.user.create({
      data: {
        ...UserFactory.make(),
        password: {
          create: await PasswordFactory.make(password),
        },
      },
    })
    const firstPasswordToken = await Auth.generateFirstPasswordToken(user.id)

    /** test */
    const updatedPassword = faker.string.alphanumeric({ length: 10 })
    const res = await server.inject({
      url,
      method,
      payload: {
        passwordToken: firstPasswordToken.token,
        password: updatedPassword,
        confirmPassword: updatedPassword,
      } as SetFirstPassword,
    })
    expect(res.statusCode).toBe(400)

    const body = JSON.parse(res.body)
    expect(body.message.includes("already configured")).toBe(true)

    /** cleanup */
    await db.user.delete({ where: { id: user.id } })
  })
})
