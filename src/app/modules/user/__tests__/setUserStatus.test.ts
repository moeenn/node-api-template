import { describe, it, expect, afterAll } from "vitest"
import { db } from "@/core/database"
import { UserRole } from "@prisma/client"
import { Auth } from "@/core/helpers"
import { SetUserStatus } from "@/app/modules/user/userSchema"
import { faker } from "@faker-js/faker"
import { UserRouter } from "../userRouter"
import { Server } from "@/core/server"

describe("setUserStatus", async () => {
  const server = Server.newTestServer(UserRouter)
  const url = "/set-status"
  const method = "POST"

  const admin = await db.user.create({
    data: {
      email: faker.internet.email(),
      name: faker.internet.userName(),
      role: UserRole.ADMIN,
    },
  })

  const adminAuthToken = await Auth.generateLoginAuthToken(admin.id, admin.role)

  afterAll(async () => {
    await db.user.delete({ where: { id: admin.id } })
    server.close()
  })

  it("valid request", async () => {
    /** setup */
    const user = await db.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.internet.userName(),
        role: UserRole.USER,
      },
    })

    /** test */
    const res = await server.inject({
      url,
      method,
      headers: {
        authorization: "Bearer " + adminAuthToken.token,
      },
      payload: {
        userId: user.id,
        status: false,
      } as SetUserStatus,
    })
    expect(res.statusCode).toBe(200)

    const foundUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
    })
    expect(foundUser).toBeTruthy()
    expect(foundUser?.approved).toBe(false)

    /** cleanup */
    await db.user.delete({ where: { id: user.id } })
  })
})
