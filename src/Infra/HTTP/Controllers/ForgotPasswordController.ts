import { Context } from "@/Infra/HTTP/Server"
import { validate } from "@/Application/Helpers"
import { AuthService } from "@/Domain/ModelServices"
import { log } from "@/Infra/Logger"
import { AuthConfig } from "@/Application/Config"
import EmailService, { ForgotPasswordEmail } from "@/Infra/Email"

/**
 *  if a user forgets their password, we can allow them to request a password
 *  reset token
*/
async function RequestReset(ctx: Context) {
  const body = validate(ctx.request.body, {
    email: "email|required",
  })

  try {
    const resetToken = await AuthService.requestPasswordReset(body.email)
    await EmailService.sendEmail(body.email, new ForgotPasswordEmail(resetToken))
  } catch (err) {
    if (err instanceof Error) {
      log(err.message)
    }
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