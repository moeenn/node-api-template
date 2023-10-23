import { describe, it, expect, afterAll } from "vitest"
import { db } from "@/core/database"
import { Auth } from "@/core/helpers"
import { UserFactory } from "@/app/modules/user/userFactory"
import { HealthCheckRouter } from "../healthCheckRouter"
import { Server } from "@/core/server"

describe("memoryUsage", () => {
  const server = Server.newTestServer(HealthCheckRouter)
  const url = "/memory"
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
