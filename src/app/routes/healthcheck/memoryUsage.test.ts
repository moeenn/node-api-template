import { describe, it, expect, afterAll } from "vitest"
import { Server } from "@/core/server"
import { database } from "@/core/database"
import { UserRole } from "@prisma/client"
import { AuthService } from "@/app/services/AuthService"

describe("memoryUsage", () => {
  const server = Server.new()
  const url = "/api/health-check/memory"
  const method = "GET"

  afterAll(() => server.close())

  it("admin auith token is required", async () => {
    /** setup */
    const user = await database.user.create({
      data: {
        email: "user@site.com",
        name: "User",
        role: UserRole.USER
      }
    })
    const authToken = await AuthService.generateLoginAuthToken(user.id, user.role)

    /** test */
    const res = await server.inject({
      url,
      method,
      headers: {
        authorization: "Bearer " + authToken
      }
    })
    expect(res.statusCode).toBe(401)

    /** cleanup */
    await database.user.delete({ where: { id: user.id }})
  })
})