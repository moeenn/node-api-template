import { db } from "@/core/database"
import { Password } from "@/core/helpers"
import { Password as Pwd, User } from "@prisma/client"
import { describe, it, expect, afterAll } from "vitest"
import { Server } from "@/core/server"
import { Login } from "@/app/modules/auth/auth.schema"
import { faker } from "@faker-js/faker"

describe("login", async () => {
  const server = Server.new()
  const url = "/api/login"
  const method = "POST"

  afterAll(() => server.close())

  it("valid credentials", async () => {
    /** setup */
    const password = faker.string.alphanumeric({ length: 10 })
    const user = await db.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.internet.userName(),
        password: {
          create: {
            hash: await Password.hash(password),
          },
        },
      },
    })

    /** test */
    const payload: Login = {
      email: user.email,
      password: password,
    }

    const res = await server.inject({
      url,
      method,
      payload,
    })
    expect(res.statusCode).toBe(200)

    const body = JSON.parse(res.body) as {
      user: User
      password: Pwd
      auth: { token: string; expiry: number }
    }

    expect(body.user).toBeTruthy()
    expect(body.password).toBeFalsy()
    expect(body.auth.token).toBeTruthy()
  })

  it("invalid credentials", async () => {
    const payload: Login = {
      email: "non-existent-user@site.com",
      password: "some-random-wrong-password",
    }

    const res = await server.inject({
      url,
      method,
      payload,
    })

    expect(res.statusCode).toBe(401)
  })
})
