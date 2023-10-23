import { describe, it, expect, afterAll } from "vitest"
import { Paginated, db } from "@/core/database"
import { clearDatabase } from "@/core/database/helpers"
import { UserRole, User } from "@prisma/client"
import { Auth } from "@/core/helpers"
import { UserFactory } from "@/app/modules/user/userFactory"
import { UserRouter } from "../userRouter"
import { Server } from "@/core/server"

describe("listUsers", async () => {
  const server = Server.newTestServer(UserRouter)
  const url = "/"
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

    const body = JSON.parse(res.body) as Paginated<User>
    const found = body.data.find((r) => r.id === userOne.id)
    expect(found).toBeTruthy()
  })

  it("valid request - search", async () => {
    /** setup */
    const userOne = await db.user.create({
      data: {
        ...UserFactory.make(),
        email: "user-one@site.com",
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

    const body = JSON.parse(res.body) as Paginated<User>
    expect(body.data.length).toBe(1)
    expect(body.pages).toBe(1)

    const foundOne = body.data.find((u) => u.id === userOne.id)
    expect(foundOne?.name).toBe(userOne.name)
  })
})
