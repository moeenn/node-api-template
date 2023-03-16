import { describe, it, expect, afterAll } from "vitest"
import { Server } from "@/core/server"
import { database } from "@/core/database"
import { UserRole } from "@prisma/client"
import { AuthService } from "@/app/services/AuthService"

describe("setUserStatus", async () => {
  const server = Server.new()
  const url = "/api/user/set-status"
  const method = "POST"

  const admin = await database.user.create({
    data: {
      email: "admin@site.com",
      name: "Admin",
      role: UserRole.ADMIN,
    }
  })
  const adminAuthToken = await AuthService.generateLoginAuthToken(admin.id, admin.role)

  afterAll(async () => {
    await database.user.delete({ where: { id: admin.id }})
    server.close()
  })

  it("valid request", async () => {
    /** setup */
    const user = await database.user.create({
      data: {
        email: "user@site.com",
        name: "User",
        role: UserRole.USER,
      }
    })

    /** test */
    const res = await server.inject({
      url,
      method,
      headers: {
        "authorization": "Bearer " + adminAuthToken
      },
      payload: {
        userId: user.id,
        status: false,
      }
    })
    expect(res.statusCode).toBe(200)

    const foundUser = await database.user.findUnique({ 
      where: {
        id: user.id,
      }
    })
    expect(foundUser).toBeTruthy()
    expect(foundUser?.approved).toBe(false)

    /** cleanup */
    await database.user.delete({ where: { id: user.id }})
  })
})