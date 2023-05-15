import { db } from "@/core/database"
import { Password } from "@/core/helpers"
import { Password as Pwd, User, UserRole } from "@prisma/client"
import { describe, it, expect, afterAll } from "vitest"
import { Server } from "@/core/server"
import { AuthService } from "@/core/services/AuthService"

describe("login", () => {
  const server = Server.new()
  const url = "/api/login"
  const method = "POST"

  afterAll(() => server.close())

  it("valid credentials", async () => {
    /** setup */
    const password = "123123123123"
    const user = await db.user.create({
      data: {
        email: "user@site.com",
        name: "Mr. User",
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
    const body = JSON.parse(res.body) as {
      user: User
      password: Pwd
      token: string
    }

    expect(body.user).toBeTruthy()
    expect(body.password).toBeFalsy()
    expect(body.token).toBeTruthy()

    const result = await AuthService.validateLoginAuthToken(body.token)
    expect(result.userId).toBe(user.id)
    expect(result.userRole).toBe(user.role)

    /** cleanup */
    await db.user.delete({ where: { id: user.id }})
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
