import { Context } from "@/Infra/HTTP/Server"
import { validate } from "@/Application/Helpers"
import { UserService } from "@/Domain/ModelServices"
import { AuthConfig } from "@/Application/Config"
import { Exception } from "@/Application/Classes"

/**
 *  return all registered users
 * 
*/
async function All(ctx: Context) {
  ctx.body = await UserService.getAllUsers()
}

/**
 *  register a new user
 *
*/
async function Register(ctx: Context) {
  const body = validate(ctx.request.body, {
    email: "email|required",
    password: `string|min:${AuthConfig.passwords.min_length}|required`,
    confirm_password: "same:password|required",
  })

  const user = await UserService.createUser({
    ...body,
    role: "client",
  })

  ctx.status = 201

  /* send user object without the password (hash) */
  ctx.body = Object.assign({}, user.toObject(), { password: undefined })
}

/**
 *  admin has the right to disable access of specific users from the system
 * 
*/
async function ToggleApprovedStatus(ctx: Context) {
  const body = validate(ctx.request.body, {
    user_id: "objectid|required",
    status: "boolean|required",
  })

  const user = await UserService.getUserByID(body.user_id)
  const admin = ctx.state["user"]
  if (admin._id.toString() === user._id.toString()) {
    throw new Exception("admin cannot disapprove their own account", 400, {
      user_id: user._id.toString(),
    })
  }

  await UserService.toggleUserActiveStatus(user, body.status)
  ctx.body = { message: "user approved status updated successfully" }
}

export default {
  All,
  Register,
  ToggleApprovedStatus,
}