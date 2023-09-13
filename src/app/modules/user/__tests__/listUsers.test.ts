import { describe, it, expect, afterAll } from "vitest"
import { Server } from "@/core/server"
import { clearDatabase, db } from "@/core/database"
import { UserRole, User } from "@prisma/client"
import { Auth } from "@/core/helpers"
import { UserFactory } from "@/app/modules/user/userFactory"

describe("listUsers", async () => {
  const server = Server.new()
  const url = "/api/users"
  const method = "GET"

  const admin = await db.user.create({
    data: UserFactory.make(UserRole.ADMIN),
  })

  const adminToken = await Auth.generateLoginAuthToken(admin.id, admin.role)

  afterAll(async () => {
    await clearDatabase()
    server.close()
  })

  it("valid request", async () => {
    /** setup */
    const userOne = await db.user.create({
      data: UserFactory.make(),
    })

    /** test */
    const res = await server.inject({
      url,
      method,
      headers: {
        authorization: "Bearer " + adminToken.token,
      },
    })
    expect(res.statusCode).toBe(200)

    const body = JSON.parse(res.body) as { pages: number; users: User[] }
    const found = body.users.find((r) => r.id === userOne.id)
    expect(found).toBeTruthy()
  })

  it("valid request - search", async () => {
    /** setup */
    const userOne = await db.user.create({
      data: UserFactory.make(),
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
  })
})
