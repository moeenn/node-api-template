import { db } from "@/core/database"
import { AuthException, BadRequestException } from "@/core/exceptions"
import { Password, requestMeta } from "@/core/helpers"
import { validateToken } from "@/core/server/middleware"
import { RouteOptions } from "fastify"
import { bodySchema, Body } from "./updatePassword.schema"

export const updatePassword: RouteOptions = {
  url: "/user/update-password",
  method: "POST",
  preValidation: [validateToken],
  schema: {
    body: bodySchema,
  },
  handler: async (req) => {
    const body = req.body as Body
    const { userId } = requestMeta(req)

    if (body.password !== body.confirmPassword) {
      throw BadRequestException("password confirmation failed")
    }

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      throw AuthException("cannot update user password", {
        userId,
        message: "non-existent user id in json token",
      })
    }

    await db.password.update({
      where: {
        userId: user.id,
      },
      data: {
        hash: await Password.hash(body.password),
      },
    })

    return {
      message: "account password updated successfully",
    }
  },
}
