import { describe, it, expect, afterAll } from "vitest"
import { Server } from "@/core/server"
import { db } from "@/core/database"
import { UserRole } from "@prisma/client"
import { AuthService } from "@/core/services/AuthService"

describe("memoryUsage", () => {
  const server = Server.new()
  const url = "/api/health-check/memory"
  const method = "GET"

  afterAll(() => server.close())

  it("admin auth token is required", async () => {
    /** setup */
    const user = await db.user.create({
      data: {
        email: "user@site.com",
        name: "User",
        role: UserRole.USER,
      },
    })
    const authToken = await AuthService.generateLoginAuthToken(
      user.id,
      user.role,
    )

    /** test */
    const res = await server.inject({
      url,
      method,
      headers: {
        authorization: "Bearer " + authToken,
      },
    })
    expect(res.statusCode).toBe(401)

    /** cleanup */
    await db.user.delete({ where: { id: user.id } })
  })
})
