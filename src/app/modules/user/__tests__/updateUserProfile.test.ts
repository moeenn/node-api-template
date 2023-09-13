import { describe, it, expect, afterAll } from "vitest"
import { Server } from "@/core/server"
import { db } from "@/core/database"
import { UserRole } from "@prisma/client"
import { Auth } from "@/core/helpers"
import { UpdateUserProfile } from "@/app/modules/user/user.schema"
import { faker } from "@faker-js/faker"

describe("updateUserProfile", () => {
  const server = Server.new()
  const url = "/api/user/profile"
  const method = "PUT"

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

    const authToken = await Auth.generateLoginAuthToken(user.id, user.role)

    /** test */
    const updatedName = "Updated Name"
    const res = await server.inject({
      url,
      method,
      headers: {
        authorization: "Bearer " + authToken.token,
      },
      payload: {
        name: updatedName,
        phone: "123123123",
        mobile: "4545454545",
      } as UpdateUserProfile,
    })
    expect(res.statusCode).toBe(200)

    const updatedUser = await db.user.findUnique({
      where: { id: user.id },
    })
    expect(updatedUser?.name).toBe(updatedName)
    expect(updatedUser?.phone).toBe("123123123")
    expect(updatedUser?.mobile).toBe("4545454545")

    /** cleanup */
    await db.user.delete({ where: { id: user.id } })
  })
})
