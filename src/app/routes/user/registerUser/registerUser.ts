import { RouteOptions } from "fastify"
import { BadRequestException } from "@/core/exceptions"
import { db } from "@/core/database"
import { logger } from "@/core/server/logger"
import { EmailService } from "@/core/email"
import { SetFirstPasswordEmail } from "@/app/emails"
import { AuthService } from "@/core/services/AuthService"
import { bodySchema, Body } from "./registerUser.schema"
import { UserRole } from "@prisma/client"
import { Password } from "@/core/helpers"

export const registerUser: RouteOptions = {
  url: "/user/register",
  method: "POST",
  schema: {
    body: bodySchema,
  },
  handler: async (req) => {
    const body = req.body as Body

    /** email address must must be unique */
    const isEmailTaken = await db.user.findFirst({
      where: {
        email: body.email,
      },
    })

    if (isEmailTaken) {
      throw BadRequestException("email address already in use", {
        email: body.email,
        message: "registration request against existing email address",
      })
    }

    if (body.password !== body.confirmPassword) {
      throw BadRequestException("password confirmation failed", {
        error: "password confirmation failed during user registration",
      })
    }

    const user = await db.user.create({
      data: {
        email: body.email,
        name: body.name,
        role: UserRole.USER,
        password: {
          create: {
            hash: await Password.hash(body.password),
          }
        }
      },
    })

    const token = await AuthService.generateFirstPasswordToken(user.id)
    const email = new SetFirstPasswordEmail({ passwordToken: token.token })

    /** don't await, send in the background */
    EmailService.instance().sendEmail(user.email, email)
    logger.info(
      { email: body.email },
      "sending email for setting first password",
    )

    return {
      message: "user registered successfully",
    }
  },
}
