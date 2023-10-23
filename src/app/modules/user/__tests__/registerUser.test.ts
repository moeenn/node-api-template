import { describe, it, expect, afterAll } from "vitest"
import { db } from "@/core/database"
import { CreateUser } from "@/app/modules/user/userSchema"
import { faker } from "@faker-js/faker"
import { UserRouter } from "../userRouter"
import { Server } from "@/core/server"

describe("registerUser", async () => {
  const server = Server.newTestServer(UserRouter)
  const url = "/register"
  const method = "POST"

  afterAll(() => server.close())

  it("valid request", async () => {
    /** test */
    const email = faker.internet.email()
    const password = faker.string.alphanumeric({ length: 10 })

    const payload: CreateUser = {
      name: faker.internet.userName(),
      email,
      password,
      confirmPassword: password,
    }

    const res = await server.inject({
      url,
      method,
      payload,
    })
    expect(res.statusCode).toBe(200)

    const foundUser = await db.user.findUnique({
      where: { email },
    })
    expect(foundUser?.name).toBe(payload.name)

    /** cleanup */
    await db.user.delete({ where: { email } })
  })

  it("email already taken", async () => {
    /** setup */
    const email = faker.internet.email()
    const password = faker.string.alphanumeric({ length: 10 })

    const user = await db.user.create({
      data: {
        email,
        name: faker.internet.userName(),
      },
    })

    /** test */
    const payload: CreateUser = {
      name: "User two",
      email,
      password,
      confirmPassword: password,
    }

    const res = await server.inject({
      url,
      method,
      payload,
    })
    expect(res.statusCode).toBe(400)

    const body = JSON.parse(res.body) as { message: string }
    expect(body.message.includes("in use")).toBe(true)

    /** cleanup */
    await db.user.delete({ where: { id: user.id } })
  })
})
