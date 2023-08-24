import { describe, it, expect, afterAll } from "vitest"
import { Server } from "@/core/server"
import { db } from "@/core/database"
import { UserRole, User } from "@prisma/client"
import { AuthService } from "@/core/services/AuthService"
import { faker } from "@faker-js/faker"

describe("listSiteUsers", async () => {
  const server = Server.new()
  const url = "/api/user/list-site-users"
  const method = "POST"

  const admin = await db.user.create({
    data: {
      email: faker.internet.email(),
      name: faker.internet.userName(),
      role: UserRole.ADMIN,
    }
  })

  const adminToken = await AuthService.generateLoginAuthToken(
    admin.id,
    admin.role,
  )

  afterAll(async () => {
    await db.user.delete({ where: { id: admin.id } }),
      server.close()
  })

  it("valid request", async () => {
    /** setup */
    const userOne = await db.user.create({
      data: {
        name: faker.internet.userName(),
        email: faker.internet.email(),
      },
    })

    /** test */
    const res = await server.inject({
      url,
      method,
      headers: {
        authorization: "Bearer " + adminToken.token,
      }
    })
    expect(res.statusCode).toBe(200)

    const body = JSON.parse(res.body) as { pages: number; users: User[] }
    const found = body.users.find((r) => r.id === userOne.id)
    expect(found).toBeTruthy()

    /** cleanup */
    await db.user.deleteMany({
      where: { id: { in: [userOne.id] } },
    })
  })

  it("valid request - search", async () => {
    /** setup */
    const userOne = await db.user.create({
      data: {
        name: faker.internet.userName(),
        email: "user-one" + faker.internet.email(),
      },
    })

    /** test */
    const res = await server.inject({
      url: url + "?query=user-one",
      method,
      headers: {
        authorization: "Bearer " + adminToken.token,
      },
    })
    expect(res.statusCode).toBe(200)

    const body = JSON.parse(res.body) as { pages: number; users: User[] }
    expect(body.users.length).toBe(1)
    expect(body.pages).toBe(1)

    const foundOne = body.users.find((u) => u.id === userOne.id)
    expect(foundOne?.name).toBe(userOne.name)

    /** cleanup */
    await db.user.deleteMany({
      where: {
        id: { in: [userOne.id] },
      },
    })
  })
})
