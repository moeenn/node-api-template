import { RouteOptions } from "fastify"
import { db } from "@/core/database"
import { Password, Auth } from "@/core/helpers"
import { BadRequestException } from "@/core/exceptions"
import { bodySchema, Body } from "./setFirstPassword.schema"

export const setFirstPassword: RouteOptions = {
  url: "/user/configure",
  method: "POST",
  schema: {
    body: bodySchema,
  },
  handler: async (req) => {
    const body = req.body as Body

    if (body.password !== body.confirmPassword) {
      throw BadRequestException("password confirmation failed", {
        message: "password confirmation mismatch when setting first password",
      })
    }

    const userId = await Auth.validateFirstPasswordToken(body.passwordToken)

    const user = await db.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        password: true,
      },
    })

    if (!user)
      throw BadRequestException("invalid password token provided", {
        userId,
        message: "non-existent userId in password token",
      })

    if (user.password)
      throw BadRequestException("user account already configured", {
        userId,
        message: "trying to configure already configured account",
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
      message: "account configured successfully",
    }
  },
}
