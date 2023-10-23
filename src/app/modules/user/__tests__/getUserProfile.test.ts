import { describe, it, expect, afterAll } from "vitest"
import { db } from "@/core/database"
import { User, UserRole } from "@prisma/client"
import { Auth } from "@/core/helpers"
import { faker } from "@faker-js/faker"
import { UserFactory } from "@/app/modules/user/userFactory"
import { UserRouter } from "../userRouter"
import { Server } from "@/core/server"

describe("getUserProfile", () => {
  const server = Server.newTestServer(UserRouter)
  const url = "/profile"
  const method = "GET"

  afterAll(() => server.close())

  it("valid request", async () => {
    /** setup */
    const user = await db.user.create({
      data: UserFactory.make(),
    })

    const authToken = await Auth.generateLoginAuthToken(user.id, user.role)

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
    const authToken = await Auth.generateLoginAuthToken(5000, UserRole.ADMIN)

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
