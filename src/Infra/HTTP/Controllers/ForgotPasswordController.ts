import { Context } from "@/Infra/HTTP/Server"
import { validate } from "@/Application/Helpers"
import { AuthService } from "@/Domain/ModelServices"
import { AuthConfig } from "@/Application/Config"
import LoggerInstance from "@/Infra/Logger"
import EventBus from "@/Infra/EventBus"

/**
 *  if a user forgets their password, we can allow them to request a password
 *  reset token
*/
async function RequestReset(ctx: Context) {
  const body = validate(ctx.request.body, {
    email: "email|required",
  })

  let resetToken: string | undefined = undefined
  try {
    resetToken = await AuthService.requestPasswordReset(body.email)
  } catch (err) {
    if (err instanceof Error) {
      LoggerInstance.log(err.message)
    }
  }

  if (resetToken) {
    EventBus.send("password-reset-request", {
      email: body.email,
      resetToken,
    })
  }

  ctx.body = {
    message: "password reset request will be processed"
  }
}

/**
 *  when a user receives the password reset token, they must use it to 
 *  set a new password for their account
*/
async function ResetPassword(ctx: Context) {
  const body = validate(ctx.request.body, {
    token: "string|required",
    password: `string|min:${AuthConfig.passwords.min_length}|required`,
    confirm_password: "same:password|required",
  })

  await AuthService.resetPassword(body)
  ctx.body = {
    message: "password updated successfully"
  }
}

export default {
  RequestReset,
  ResetPassword,
}