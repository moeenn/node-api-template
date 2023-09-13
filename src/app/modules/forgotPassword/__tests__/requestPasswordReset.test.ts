import { describe, it, expect, afterAll } from "vitest"
import { Server } from "@/core/server"
import { db } from "@/core/database"
import { EmailService } from "@/core/email"
import { ForgotPasswordEmailArgs } from "@/app/emails"
import { Auth } from "@/core/helpers"
import { RequestPasswordReset } from "@/app/modules/forgotPassword/forgotPassword.schema"

describe("requestPasswordReset", () => {
  const server = Server.new()
  const url = "/api/forgot-password/request-reset"
  const method = "POST"

  afterAll(() => server.close())

  it("valid request", async () => {
    /** setup */
    const user = await db.user.create({
      data: {
        email: "user@site.com",
        name: "User",
      },
    })

    /** test */
    const res = await server.inject({
      url,
      method,
      payload: {
        email: user.email,
      } as RequestPasswordReset,
    })
    expect(res.statusCode).toBe(200)

    const isEmailSent = EmailService.instance().sentEmails.find(
      (e) => e.to == user.email,
    )

    const emailArgs = isEmailSent?.email.args as ForgotPasswordEmailArgs
    expect(emailArgs.resetToken).toBeTruthy()

    const isTokenValid = await Auth.validatePasswordResetToken(
      emailArgs.resetToken,
    )
    expect(isTokenValid !== 0).toBe(true)

    /** cleanup */
    await db.user.delete({ where: { id: user.id } })
    EmailService.instance().clearSentEmails()
  })

  it("invalid email address", async () => {
    const email = "some_random_nonexistent_email@site.com"

    const res = await server.inject({
      url,
      method,
      payload: {
        email,
      } as RequestPasswordReset,
    })
    expect(res.statusCode).toBe(200)

    const isEmailSent = EmailService.instance().sentEmails.find(
      (e) => e.to == email,
    )
    expect(isEmailSent).toBeFalsy()
  })
})
