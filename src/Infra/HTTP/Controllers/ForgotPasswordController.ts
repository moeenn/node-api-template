import { Context } from "@/Infra/HTTP/Server"
import { validate } from "@/Application/Helpers"
import { z } from "@/Application/Helpers/Validator"
import { PasswordReset } from "@/Domain/Models"
import { AuthService } from "@/Domain/ModelServices"
import { AuthConfig } from "@/Application/Config"
import { LoggerServiceInstance } from "@/Infra/Logger"
import { EventBusServiceInstance } from "@/Infra/EventBus"

/**
 *  if a user forgets their password, we can allow them to request a password
 *  reset token
 */
async function RequestReset(ctx: Context) {
  const body = validate(
    ctx.request.body,
    z.object({
      email: z.string().email(),
    }),
  )

  let resetToken: string | undefined = undefined
  try {
    resetToken = await AuthService.requestPasswordReset(body.email)
  } catch (err) {
    if (err instanceof Error) {
      LoggerServiceInstance.log(err.message)
    }
  }

  if (resetToken) {
    EventBusServiceInstance.send("password-reset-request", {
      email: body.email,
      resetToken,
    })
  }

  ctx.body = {
    message: "password reset request will be processed",
  }
}

/**
 *  when a user receives the password reset token, they must use it to
 *  set a new password for their account
 */
async function ResetPassword(ctx: Context) {
  const body = validate(
    ctx.request.body,
    z.object({
      token: z.string(),
      password: z.string().min(AuthConfig.passwords.min_length),
      confirm_password: z.string(), // TODO: must match with password
    }),
  )

  await PasswordReset.actions.resetUserPassword(body)
  ctx.body = {
    message: "password updated successfully",
  }
}

export const ForgotPasswordController = {
  RequestReset,
  ResetPassword,
}
