import { database } from "@/core/database"
import { Password } from "@/core/helpers"
import { UserRole } from "@prisma/client"
import { describe, it, expect, afterAll } from "vitest"
import { Server } from "@/core/server"

describe("login", () => {
  const server = Server.new()
  const url = "/api/login"
  const method = "POST"

  afterAll(() => server.close())

  it("valid credentials", async () => {
    /** setup */
    const password = "123123123123"
    const user = await database.user.create({
      data: {
        email: "user@site.com",
        name: "user",
        role: UserRole.USER,
        password: {
          create: {
            hash: await Password.hash(password),
          },
        },
      },
    })

    /** test */
    const res = await server.inject({
      url,
      method,
      payload: {
        email: user.email,
        password: password,
      },
    })
    expect(res.statusCode).toBe(200)

    const body = JSON.parse(res.body)
    expect(body.user).toBeTruthy()
    expect(body.token).toBeTruthy()

    /** cleanup */
    await database.user.delete({ where: { id: user.id } })
  })

  it("invalid credentials", async () => {
    const res = await server.inject({
      url,
      method,
      payload: {
        email: "non-existent-user@site.com",
        password: "some-random-wrong-password",
      },
    })

    expect(res.statusCode).toBe(401)
  })
})
