import { db } from "@/core/database"
import { Password as Pwd, User } from "@prisma/client"
import { describe, it, expect, afterAll } from "vitest"
import { Login } from "@/app/modules/auth/authSchema"
import { faker } from "@faker-js/faker"
import { UserFactory } from "@/app/modules/user/userFactory"
import { PasswordFactory } from "@/app/modules/password/passwordFactory"
import { AuthRouter } from "../authRouter"
import { Server } from "@/core/server"

describe("login", async () => {
  const server = Server.newTestServer(AuthRouter)
  const url = "/login"
  const method = "POST"

  afterAll(() => server.close())

  it("valid credentials", async () => {
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
      email: UserFactory.make().email,
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
