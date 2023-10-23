import { describe, it, expect, afterAll } from "vitest"
import { db } from "@/core/database"
import { Auth } from "@/core/helpers"
import { UserFactory } from "@/app/modules/user/userFactory"
import { AuthRouter } from "../authRouter"
import { Server } from "@/core/server"

describe("refreshAuthToken", async () => {
  const server = Server.newTestServer(AuthRouter)
  const url = "/refresh-token"
  const method = "GET"

  const user = await db.user.create({
    data: UserFactory.make(),
  })

  const userToken = await Auth.generateLoginAuthToken(user.id, user.role)

  afterAll(async () => {
    await db.user.delete({ where: { id: user.id } })
    server.close()
  })

  it("valid request", async () => {
    /** sleep */
    await new Promise((resolve) => setTimeout(resolve, 500))

    const res = await server.inject({
      url,
      method,
      headers: {
        authorization: "Bearer " + userToken.token,
      },
    })

    expect(res.statusCode).toBe(200)
    const body = JSON.parse(res.body) as { token: string; expiry: number }
    expect(body.token !== userToken.token).toBeTruthy
    expect(body.expiry > userToken.expiry).toBeTruthy()
  })

  it("disabled user", async () => {
    /** setup */
    await db.user.update({
      where: { id: user.id },
      data: { approved: false },
    })

    /** sleep */
    await new Promise((resolve) => setTimeout(resolve, 500))

    /** test */
    const res = await server.inject({
      url,
      method,
      headers: {
        authorization: "Bearer " + userToken.token,
      },
    })

    expect(res.statusCode).toBe(401)
    const body = JSON.parse(res.body) as { message: string }
    expect(body.message.includes("Cannot")).toBeTruthy()
  })
})
