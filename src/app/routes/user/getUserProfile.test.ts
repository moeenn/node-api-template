import { describe, it, expect, afterAll } from "vitest"
import { Server } from "@/core/server"
import { database } from "@/core/database"
import { UserRole } from "@prisma/client"
import { AuthService } from "@/app/services/AuthService"

describe("getUserProfile", () => {
  const server = Server.new()
  const url = "/api/user/profile"
  const method = "GET"

  afterAll(() => server.close())

  it("valid request", async () => {
    /** setup */
    const user = await database.user.create({
      data: {
        email: "user@site.com",
        name: "User",
        role: UserRole.USER,
      },
    })
    const authToken = await AuthService.generateLoginAuthToken(
      user.id,
      UserRole.USER,
    )

    /** test */
    const res = await server.inject({
      url,
      method,
      headers: {
        authorization: "Bearer " + authToken,
      },
    })

    expect(res.statusCode).toBe(200)

    const body = JSON.parse(res.body)
    expect(body.email).toBe(user.email)
    expect(body.role).toBe(user.role)

    /** cleanup */
    await database.user.delete({ where: { id: user.id } })
  })

  it("invalid token", async () => {
    /** setup */
    const authToken = await AuthService.generateLoginAuthToken(
      5000,
      UserRole.USER,
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
  })

  it("invalid token", async () => {
    const res = await server.inject({
      url,
      method,
      headers: {
        authorization: "Bearer some_random_token",
      },
    })
    expect(res.statusCode).toBe(403)
  })
})
