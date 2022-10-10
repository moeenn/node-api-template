import { Context } from "@/Infra/HTTP/Server"
import { validate } from "@/Application/Helpers"
import { User, Upload } from "@/Domain/Models"
import { Exception } from "@/Application/Exceptions"
import { AuthConfig } from "@/Application/Config"
import { z, objectid } from "@/Application/Helpers/Validator"

/**
 *  list down all users registered with the system
 *
 */
async function All(ctx: Context) {
  ctx.body = await User.actions.getAllUsers()
}

/**
 *  get a specific user
 *
 */
async function GetUser(ctx: Context) {
  const params = validate(
    ctx.params,
    z.object({
      id: z.string().refine(objectid.handler, objectid.options),
    }),
  )

  const user = await User.actions.getUserByID(params.id)
  ctx.body = user
}

/**
 *  admin has the right to revoke access of any user at any time,
 *  this function is used to set the access of any user to the system.
 *  if user.approved is false, use will not be able to access any protected
 *  resources
 */
async function ToggleApprovedStatus(ctx: Context) {
  const body = validate(
    ctx.request.body,
    z.object({
      user_id: z.string(),
      status: z.boolean(),
    }),
  )

  const user = await User.actions.getUserByID(body.user_id)
  const admin = ctx.state["user"]

  if (admin._id.toString() === user._id.toString()) {
    throw new Exception("admin cannot disable their own account", 400, {
      user_id: admin._id,
    })
  }

  await User.actions.toggleUserApprovedStatus(user, body.status)
  ctx.body = {
    message: "user approved status updated successfully",
  }
}

/**
 *  register a new institute user
 *
 */
async function RegisterUser(ctx: Context) {
  const body = validate(
    ctx.request.body,
    z.object({
      email: z.string().email(),
      password: z.string().min(AuthConfig.passwords.min_length),
      confirm_password: z.string(), // TODO: must match password
      profile: z.object({
        name: z.string(),
        avatar_id: z
          .string()
          .refine(objectid.handler, objectid.options)
          .optional(),
      }),
    }),
    // .refine((data) => data.password === data.confirm_password, {
    //   message: "password confirmation failed",
    // })
  )

  const avatar = body.profile.avatar_id
    ? await Upload.actions.getUploadByID(body.profile.avatar_id)
    : undefined

  const user = await User.actions.createUser({
    ...body,
    user_role: "user",
    profile: {
      name: body.profile.name,
      avatar,
    },
  })

  ctx.status = 201
  ctx.body = Object.assign({}, user.toObject(), {
    password: undefined,
  })
}

export const UserController = {
  All,
  ToggleApprovedStatus,
  GetUser,
  RegisterUser,
}
