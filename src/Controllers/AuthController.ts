import { Context } from "@/Core/Server"
import { report, Password, Random, Validator } from "@/Core/Helpers"
import { User, AuthToken } from "@/Models"
import authConfig from "@/Core/Config/auth.json"

/**
 *  register a new user
 * 
*/
async function Register(ctx: Context) {
  const { body } = ctx.request
  const v = new Validator(body, {
    email: "string|required",
    password: `string|min:${authConfig.passwords.min_length}|required`,
    confirm_password: "same:password|required",
  })

  if (v.fails()) {
    return report(ctx, {}, v.errors, 422)
  }

  const user = new User({
    email: body.email,
    password: await Password.hash(body.password),
    role: authConfig.default_role,
  })

  try {
    await user.save()
  } catch (err) {
    return report(ctx, err, {}, 400)
  }
  
  const { _id, email, role, approved } = user.toObject()
  ctx.status = 201
  ctx.body = { _id, email, role, approved }
}

/**
 *  log-in a registered user
 * 
*/
async function Login(ctx: Context) {
  const { body } = ctx.request
  const v = new Validator(body, {
    email: "string|required",
    password: `string|min:${authConfig.passwords.min_length}|required`,
  })

  if (v.fails()) {
    return report(ctx, {}, v.errors, 422)
  }

  const user = await User.findOne({ email: body.email }).select("+password")
  if (!user) {
    return ctx.throw(401)
  }

  if (!user.approved) {
    return ctx.throw(401, "user account has been disabled")
  }

  const verified = await Password.verify(user.password, body.password)
  if (!verified) {
    return ctx.throw(401)
  }

  const token = Random.string(authConfig.tokens.bytes)
  const authToken = new AuthToken({ user, token })
  await authToken.save()

  ctx.body = {
    id: user._id,
    email: user.email,
    role: user.role,
    approved: user.approved,
    token,
  }
}

/** 
 *  logout a logged-in user
 * 
*/
async function Logout(ctx: Context) {
  const user = ctx.state["user"]
  const { token } = ctx.request

  const authToken = await AuthToken.findOne({ user, token })
  if (!authToken) {
    return ctx.throw(401, "invalid auth token")
  }

  await authToken.delete()
  ctx.status = 200
}

export default {
  Register,
  Login,
  Logout,
}