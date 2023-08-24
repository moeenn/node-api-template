import { RouteOptions } from "fastify"
import { AuthException, BadRequestException } from "@/core/exceptions"
import { AuthService } from "@/core/services/AuthService"
import { db } from "@/core/database"
import { Password } from "@/core/helpers"
import { bodySchema, Body } from "./resetForgottenPassword.schema"

export const resetForgottenPassword: RouteOptions = {
  url: "/forgot-password/reset-password",
  method: "POST",
  schema: {
    body: bodySchema,
  },
  handler: async (req) => {
    const body = req.body as Body

    if (body.password !== body.confirmPassword) {
      throw BadRequestException("password confirmation failed")
    }

    const userId = await AuthService.validatePasswordResetToken(body.token)
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user)
      throw AuthException("cannot reset password", {
        userId,
        message: "id of non-existent user in json token",
      })

    const hash = await Password.hash(body.password)
    await db.password.upsert({
      where: {
        userId: user.id,
      },
      update: { hash },
      create: {
        userId: user.id,
        hash,
      },
    })

    return {
      message: "password updated successfully",
    }
  },
}
