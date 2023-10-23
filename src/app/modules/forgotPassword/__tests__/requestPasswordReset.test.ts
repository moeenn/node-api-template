import { describe, it, expect, afterAll } from "vitest"
import { db } from "@/core/database"
import { EmailService } from "@/core/email"
import { RequestPasswordResetEmailArgs } from "@/app/modules/forgotPassword/emails/RequestPasswordResetEmail"
import { Auth } from "@/core/helpers"
import { RequestPasswordReset } from "@/app/modules/forgotPassword/forgotPasswordSchema"
import { UserFactory } from "@/app/modules/user/userFactory"
import { ForgotPasswordRouter } from "@/app/modules/forgotPassword/forgotPasswordRouter"
import { Server } from "@/core/server"

describe("requestPasswordReset", () => {
  const server = Server.newTestServer(ForgotPasswordRouter)
  const url = "/request-reset"
  const method = "POST"

  afterAll(() => server.close())

  it("valid request", async () => {
    /** setup */
    const user = await db.user.create({
      data: UserFactory.make(),
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

    const isEmailSent = EmailService.instance.sentEmails.find(
      (e) => e.to == user.email,
    )

    const emailArgs = isEmailSent?.email.args as RequestPasswordResetEmailArgs
    expect(emailArgs.resetToken).toBeTruthy()

    const isTokenValid = await Auth.validatePasswordResetToken(
      emailArgs.resetToken,
    )
    expect(isTokenValid !== 0).toBe(true)

    /** cleanup */
    await db.user.delete({ where: { id: user.id } })
    EmailService.instance.clearSentEmails()
  })

  it("invalid email address", async () => {
    const email = UserFactory.make().email

    const res = await server.inject({
      url,
      method,
      payload: {
        email,
      } as RequestPasswordReset,
    })
    expect(res.statusCode).toBe(200)

    const isEmailSent = EmailService.instance.sentEmails.find(
      (e) => e.to == email,
    )
    expect(isEmailSent).toBeFalsy()
  })
})
