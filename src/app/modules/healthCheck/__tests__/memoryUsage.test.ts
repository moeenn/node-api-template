import { describe, it, expect, afterAll } from "vitest"
import { Server } from "@/core/server"
import { db } from "@/core/database"
import { Auth } from "@/core/helpers"
import { UserFactory } from "@/app/modules/user/userFactory"

describe("memoryUsage", () => {
  const server = Server.new()
  const url = "/api/health-check/memory"
  const method = "GET"

  afterAll(() => server.close())

  it("admin auith token is required", async () => {
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
    expect(res.statusCode).toBe(401)

    /** cleanup */
    await db.user.delete({ where: { id: user.id } })
  })
})
