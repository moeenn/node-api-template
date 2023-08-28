import { describe, it, expect, afterAll } from "vitest"
import { Server } from "@/core/server"
import { db } from "@/core/database"
import { Password, Auth } from "@/core/helpers"
import { Body } from "./setFirstPassword.schema"
import { faker } from "@faker-js/faker"

describe("setFirstPassword", () => {
  const server = Server.new()
  const url = "/api/user/configure"
  const method = "POST"

  afterAll(() => server.close())

  it("valid configure request", async () => {
    /** setup */
    const user = await db.user.create({
      data: {
        email: "user@site.com",
        name: "User",
      },
    })
    const firstPasswordToken = await Auth.generateFirstPasswordToken(
      user.id,
    )

    /** test */
    const password = faker.string.alphanumeric({ length: 10 })
    const res = await server.inject({
      url,
      method,
      payload: {
        passwordToken: firstPasswordToken.token,
        password,
        confirmPassword: password,
      } as Body,
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
        email: "user@site.com",
        name: "User",
        password: {
          create: {
            hash: await Password.hash(password),
          },
        },
      },
    })
    const firstPasswordToken = await Auth.generateFirstPasswordToken(
      user.id,
    )

    /** test */
    const updatedPassword = faker.string.alphanumeric({ length: 10 })
    const res = await server.inject({
      url,
      method,
      payload: {
        passwordToken: firstPasswordToken.token,
        password: updatedPassword,
        confirmPassword: updatedPassword,
      } as Body,
    })
    expect(res.statusCode).toBe(400)

    const body = JSON.parse(res.body)
    expect(body.message.includes("already configured")).toBe(true)

    /** cleanup */
    await db.user.delete({ where: { id: user.id } })
  })
})
