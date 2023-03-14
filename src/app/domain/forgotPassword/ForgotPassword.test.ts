import { describe, it, expect } from "vitest"
import { ForgotPasswordController } from "./ForgotPassword.controller"
import { EmailService } from "@/core/email"
import { ForgotPasswordEmailArgs } from "@/app/emails"
import { UserService } from "@/app/domain/user"
import { UserRole } from "@prisma/client"
import { Password } from "@/core/helpers"

describe("ForgotPasswordController", () => {
  it("requestPasswordReset & validateToken", async () => {
    /* setup */
    const user = await UserService.createUser({
      name: "some random user",
      email: "some_random_user@site.com",
      role: UserRole.ADMIN,
    })
    expect(user).toBeTruthy()

    await ForgotPasswordController.requestPasswordReset({
      email: user.email,
    })

    const isEmailSent = EmailService.instance().sentEmails.find(
      (e) => e.to == user.email,
    )

    const emailArgs = isEmailSent?.email.args as ForgotPasswordEmailArgs
    expect(emailArgs.resetToken).toBeTruthy()

    const isTokenValid = await ForgotPasswordController.validateToken({
      token: emailArgs.resetToken,
    })
    expect(isTokenValid).toBe(true)

    /* cleanup */
    await UserService.removeUser(user)
    EmailService.instance().clearSentEmails()
  })

  it("requestPasswordReset invalid email", async () => {
    const email = "some_random_nonexistent_email@site.com"

    await ForgotPasswordController.requestPasswordReset({ email })

    const isEmailSent = EmailService.instance().sentEmails.find(
      (e) => e.to == email,
    )
    expect(isEmailSent).toBeFalsy()
  })

  it("resetForgottenPassword", async () => {
    /* setup */
    const user = await UserService.createUser({
      name: "some random user",
      email: "some_random_user@site.com",
      role: UserRole.ADMIN,
    })

    const firstPassword = "some_Random_p3d(/1/)"
    await UserService.setUserPassword(user, firstPassword)

    await ForgotPasswordController.requestPasswordReset({
      email: user.email,
    })
    const sentEmail = EmailService.instance().sentEmails.find(
      (e) => e.to == user.email,
    )
    expect(sentEmail).toBeTruthy()

    const emailArgs = sentEmail?.email.args as ForgotPasswordEmailArgs
    const updatedPassword = "some_Random_p3d(/1/}{>*^D"

    await ForgotPasswordController.resetForgottenPassword({
      token: emailArgs.resetToken,
      password: updatedPassword,
      confirmPassword: updatedPassword,
    })

    const refreshedUser = await UserService.getUserByIDWithPassword(user.id)
    const isPasswordValid = await Password.verify(
      refreshedUser.password?.hash ?? "",
      updatedPassword,
    )
    expect(isPasswordValid).toBe(true)

    /* cleanup */
    await UserService.removeUser(user)
    EmailService.instance().clearSentEmails()
  })
})
