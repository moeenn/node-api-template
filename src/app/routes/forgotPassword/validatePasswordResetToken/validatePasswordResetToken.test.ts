import { describe, it, expect, afterAll } from "vitest"
import { Server } from "@/core/server"
import { db } from "@/core/database"
import { UserRole } from "@prisma/client"
import { Auth } from "@/core/helpers"
import { Body } from "./validatePasswordResetToken.schema"
import { faker } from "@faker-js/faker"

describe("validatePasswordResetToken", () => {
  const server = Server.new()
  const url = "/api/forgot-password/validate-reset-token"
  const method = "POST"

  afterAll(() => server.close())

  it("valid request", async () => {
    /** setup */
    const user = await db.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.internet.userName(),
        role: UserRole.USER,
      },
    })
    const resetToken = await Auth.generatePasswordResetToken(user.id)

    /** test */
    const res = await server.inject({
      url,
      method,
      payload: {
        token: resetToken.token,
      } as Body,
    })
    expect(res.statusCode).toBe(200)

    const body = JSON.parse(res.body)
    expect(body.isValid).toBe(true)

    /** cleanup */
    await db.user.delete({ where: { id: user.id } })
  })
})