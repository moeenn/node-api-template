import { Context } from "@/Infra/HTTP/Server"
import { AuthConfig } from "@/Application/Config"
import { validate } from "@/Application/Helpers"
import { log } from "@/Application/Logger"
import { AuthService } from "@/Domain/ModelServices"

/**
 *  if a user forgets their password, we can allow them to request a password
 *  reset token
*/
async function RequestReset(ctx: Context) {
  const body = validate(ctx.request.body, {
    email: "email|required",
  })

  try {
    await AuthService.requestPasswordReset(body.email)
  } catch (err) {
    if (err instanceof Error) {
      log(err.message)
    }
  }

  // TODO: send email to the user
  ctx.body = { message: "password reset request will be processed" }
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
  ctx.body = { message: "password updated successfully" }
}

export default {
  RequestReset,
  ResetPassword,
}
