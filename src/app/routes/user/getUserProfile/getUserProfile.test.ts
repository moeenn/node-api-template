import { describe, it, expect, afterAll } from "vitest"
import { Server } from "@/core/server"
import { db } from "@/core/database"
import { User, UserRole } from "@prisma/client"
import { Auth } from "@/core/helpers"
import { faker } from "@faker-js/faker"

describe("getUserProfile", () => {
  const server = Server.new()
  const url = "/api/user/profile"
  const method = "GET"

  afterAll(() => server.close())

  it("valid request", async () => {
    /** setup */
    const user = await db.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.internet.userName(),
      },
    })

    const authToken = await Auth.generateLoginAuthToken(
      user.id,
      user.role,
    )

    /** test */
    const res = await server.inject({
      url,
      method,
      headers: {
        authorization: "Bearer " + authToken.token,
      },
    })

    expect(res.statusCode).toBe(200)

    const body = JSON.parse(res.body) as User
    expect(body.email).toBe(user.email)
    expect(body.role).toBe(user.role)

    /** cleanup */
    await db.user.delete({ where: { id: user.id } })
  })

  it("invalid token", async () => {
    /** setup */
    const authToken = await Auth.generateLoginAuthToken(
      5000,
      UserRole.ADMIN,
    )

    /** test */
    const res = await server.inject({
      url,
      method,
      headers: {
        authorization: "Bearer " + authToken.token,
      },
    })
    expect(res.statusCode).toBe(401)
  })

  it("invalid token", async () => {
    const res = await server.inject({
      url,
      method,
      headers: {
        authorization: "Bearer " + faker.string.alpha({ length: 5 }),
      },
    })
    expect(res.statusCode).toBe(403)
  })
})
