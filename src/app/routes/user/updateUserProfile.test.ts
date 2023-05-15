import { describe, it, expect, afterAll } from "vitest"
import { Server } from "@/core/server"
import { db } from "@/core/database"
import { UserRole } from "@prisma/client"
import { AuthService } from "@/core/services/AuthService"

describe("updateUserProfile", () => {
  const server = Server.new()
  const url = "/api/user/profile"
  const method = "PUT"

  afterAll(() => server.close())

  it("valid request", async () => {
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
    const updatedName = "Updated Name"
    const res = await server.inject({
      url,
      method,
      headers: {
        authorization: "Bearer " + authToken,
      },
      payload: {
        name: updatedName,
      },
    })
    expect(res.statusCode).toBe(200)

    const updatedUser = await db.user.findUnique({
      where: { id: user.id },
    })
    expect(updatedUser?.name).toBe(updatedName)

    /** cleanup */
    await db.user.delete({ where: { id: user.id } })
  })
})
