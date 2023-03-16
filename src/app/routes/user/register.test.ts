import { describe, it, expect, afterAll } from "vitest"
import { Server } from "@/core/server"
import { database } from "@/core/database"
import { UserRole } from "@prisma/client"

describe("register", () => {
  const server = Server.new()
  const url = "/api/user/register"
  const method = "POST"

  afterAll(() => server.close())

  it("valid request", async () => {
    /** test */
    const email = "user@site.com"
    const password = "some_random_password111"
    const res = await server.inject({
      url,
      method,
      payload: {
        email,
        name: "User",
        password,
        confirmPassword: password,
      },
    })
    expect(res.statusCode).toBe(200)

    const foundUser = await database.user.findUnique({
      where: { email },
    })
    expect(foundUser).toBeTruthy()

    /** cleanup */
    await database.user.delete({ where: { email } })
  })

  it("password mismatch", async () => {
    /** test */
    const email = "user@site.com"
    const password = "some_random_password111"
    const res = await server.inject({
      url,
      method,
      payload: {
        email,
        name: "User",
        password,
        confirmPassword: password + "something",
      },
    })
    expect(res.statusCode).toBe(400)

    const body = JSON.parse(res.body)
    expect(body.message.includes("failed")).toBe(true)
  })

  it("email already taken", async () => {
    /** setup */
    const user = await database.user.create({
      data: {
        email: "user@site.com",
        name: "User",
        role: UserRole.USER,
      },
    })
    const password = "some_random_apssword_23123"

    /** test */
    const res = await server.inject({
      url,
      method,
      payload: {
        email: user.email,
        name: "User two",
        password,
        confirmPassword: password,
      },
    })
    expect(res.statusCode).toBe(400)

    const body = JSON.parse(res.body)
    expect(body.message.includes("in use")).toBe(true)

    /** cleanup */
    await database.user.delete({ where: { id: user.id } })
  })
})
