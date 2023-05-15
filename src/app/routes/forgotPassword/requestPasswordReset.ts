import { db } from "@/core/database"
import { logger } from "@/core/server/logger"
import { RouteOptions } from "fastify"
import { FromSchema } from "json-schema-to-ts"
import { AuthService } from "@/core/services/AuthService"
import { ForgotPasswordEmail } from "@/app/emails"
import { EmailService } from "@/core/email"

const bodySchema = {
  type: "object",
  properties: {
    email: { type: "string" },
  },
  required: ["email"],
} as const

type Body = FromSchema<typeof bodySchema>

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
    const email = new ForgotPasswordEmail({ resetToken: token })

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
