import { db } from "@/core/database"
import { logger } from "@/core/server/logger"
import { RouteOptions } from "fastify"
import { AuthService } from "@/core/services/AuthService"
import { ForgotPasswordEmail } from "@/app/emails"
import { EmailService } from "@/core/email"
import { bodySchema, Body } from "./requestPasswordReset.schema"

export const requestPasswordReset: RouteOptions = {
  url: "/forgot-password/request-reset",
  method: "POST",
  schema: {
    body: bodySchema,
  },
  handler: async (req) => {
    const body = req.body as Body

    const user = await db.user.findUnique({
      where: {
        email: body.email,
      },
    })

    if (!user) {
      logger.info(
        { email: body.email },
        "password reset request for non-existent user",
      )
      return {
        message: "password reset request will be processed",
      }
    }

    const token = await AuthService.generatePasswordResetToken(user.id)
    const email = new ForgotPasswordEmail({ resetToken: token.token })

    /** don't await, send in the background */
    EmailService.instance().sendEmail(user.email, email)
    logger.info(
      { email: body.email },
      "sending forgot password (password reset) email",
    )

    return {
      message: "password reset request will be processed",
    }
  },
}
