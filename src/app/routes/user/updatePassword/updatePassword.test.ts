import { describe, it, expect, afterAll } from "vitest"
import { Server } from "@/core/server"
import { db } from "@/core/database"
import { UserRole } from "@prisma/client"
import { Password } from "@/core/helpers"
import { AuthService } from "@/core/services/AuthService"
import { Body } from "./updatePassword.schema"
import { faker } from "@faker-js/faker"

describe("updatePassword", () => {
  const server = Server.new()
  const url = "/api/user/update-password"
  const method = "POST"

  afterAll(() => server.close())

  it("valid request", async () => {
    /** setup */
    const user = await db.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.internet.userName(),
        password: {
          create: {
            hash: await Password.hash(faker.string.alphanumeric({ length: 10 })),
          },
        },
      },
    })

    const authToken = await AuthService.generateLoginAuthToken(
      user.id,
      user.role,
    )

    /** test */
    const updatedPassword = faker.string.alphanumeric({ length: 10 })
    const res = await server.inject({
      url,
      method,
      headers: {
        authorization: "Bearer " + authToken.token,
      },
      payload: {
        password: updatedPassword,
        confirmPassword: updatedPassword,
      } as Body,
    })
    expect(res.statusCode).toBe(200)

    const updatedUser = await db.user.findUnique({
      where: { id: user.id },
      include: { password: true },
    })

    const isHashValid = await Password.verify(
      updatedUser?.password?.hash ?? "",
      updatedPassword,
    )
    expect(isHashValid).toBe(true)

    /** cleanup */
    await db.user.delete({ where: { id: user.id } })
  })
})
