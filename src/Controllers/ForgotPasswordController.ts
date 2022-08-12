import { Context } from "@/Core/Server"
import { report, Random, Password, Validator } from "@/Core/Helpers"
import { User, PasswordReset } from "@/Models"
import authConfig from "@/Core/Config/auth.json"

/**
 *  if a user forgets their password, we can allow them to request a password
 *  reset token
*/
async function RequestReset(ctx: Context) {
  const { body } = ctx.request
  const v = new Validator(body, {
    email: "email|required",
  })

  if (v.fails()) {
    return report(ctx, {}, v.errors, 422)
  }

  const user = await User.findOne({ email: body.email })
  if (!user) {
    ctx.body = { message: "password reset request will be processed" }
    return
  }

  const token = Random.string(authConfig.tokens.bytes)
  const reset = new PasswordReset({ user, token })
  await reset.save()

  // TODO: send email to the user
  ctx.body = { message: "password reset request will be processed" }
}


/**
 *  when a user receives the password reset token, they must use it to 
 *  set a new password for their account
*/
async function ResetPassword(ctx: Context) {
  const { body } = ctx.request
  const v = new Validator(body, {
    token: "string|required",
    password: `string|min:${authConfig.passwords.min_length}|required`,
    confirm_password: "same:password|required",
  })

  if (v.fails()) {
    return report(ctx, {}, v.errors, 422)
  }

  const reset = await PasswordReset.findOne({ token: body.token }).populate("user")
  if (!reset) {
    return ctx.throw(400, "invalid reset token")
  }

  if (!reset.user) {
    return ctx.throw(404, "user not found")
  }

  await reset.user.updateOne({ 
    password: await Password.hash(body.password),
  })

  await PasswordReset.find({ user: reset.user }).deleteMany().exec()
  ctx.body = { message: "password updated successfully" }
}


export default {
  RequestReset,
  ResetPassword,
}