import { Context } from "@/Infra/HTTP/Server"
import { validate } from "@/Application/Helpers"
import { UserService, UploadService } from "@/Domain/ModelServices"
import { Exception } from "@/Application/Classes"
import { AuthConfig } from "@/Application/Config"

/**
 *  list down all users registered with the system
 * 
*/
async function All(ctx: Context) {
  ctx.body = await UserService.getAllUsers()
}

/**
 *  get a specific user
 * 
*/
async function GetUser(ctx: Context) {
  const params = validate(ctx.params, {
    id: "objectid|string",
  })

  const user = await UserService.getUserByID(params.id)
  ctx.body = user
}

/**
 *  admin has the right to revoke access of any user at any time, 
 *  this function is used to set the access of any user to the system.
 *  if user.approved is false, use will not be able to access any protected 
 *  resources
*/
async function ToggleApprovedStatus(ctx: Context) {
  const body = validate(ctx.request.body, {
    user_id: "objectid|required",
    status: "boolean|required",
  })

  const user = await UserService.getUserByID(body.user_id)
  const admin = ctx.state["user"]

  if (admin._id.toString() === user._id.toString()) {
    throw new Exception("admin cannot disable their own account", 400, {
      user_id: admin._id,
    })
  }

  await UserService.toggleUserApprovedStatus(user, body.status)
  ctx.body = {
    message: "user approved status updated successfully"
  }
}

/**
 *  register a new institute user
 * 
*/
async function RegisterUser(ctx: Context) {
  const body = validate(ctx.request.body, {
    email: "email|string",
    password: `string|min:${AuthConfig.passwords.min_length}|required`,
    confirm_password: "same:password|required",
    profile: {
      name: "string|required",
      avatar_id: "objectid",
    }
  })

  body.profile.avatar = (body.avatar_id)
    ? await UploadService.getUploadByID(body.avatar_id)
    : undefined

  const user = await UserService.createUser(body)

  ctx.status = 201
  ctx.body = Object.assign({}, user.toObject(), { password: undefined })
}

export default {
  All,
  ToggleApprovedStatus,
  GetUser,
  RegisterUser,
}