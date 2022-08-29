import { Context } from "@/Infra/HTTP/Server"
import { ProfileService, UploadService } from "@/Domain/ModelServices"
import { validate } from "@/Application/Helpers"
import { AuthConfig } from "@/Application/Config"
import { Exception } from "@/Application/Classes"

/**
 *  get profile details of the current user
 * 
*/
async function ProfileDetails(ctx: Context) {
  const user = ctx.state["user"]
  await user.populate("profile.avatar")
  
  ctx.body = user.toObject()
}

/**
 *  edit an existing user's profile
 *  
*/
async function EditProfile(ctx: Context) {
  const body = validate(ctx.request.body, {
    email: "email|string",
    password: `string|min:${AuthConfig.passwords.min_length}`,
    confirm_password: "same:password",
    profile: {
      name: "string|required",
      custom_id: "string|required",
      description: "string",
      country: "string",
      avatar_id: "string",
    }
  })

  /* user should not be able to change their own user_role */
  if (body.user_role) {
    throw new Exception("cannot change own user_role", 401)
  }

  const user = ctx.state["user"]

  // const oldAvatar = user.profile.avatar
  const avatar = (body.profile.avatar_id)
    ? await UploadService.getUploadByID(body.profile.avatar_id)
    : undefined

  /**
   *  cleanup: if an old avatar was set and now a new avatar is provided
   *  we remove the old avatar from S3 storage
   *  TODO: test and implement
  */
  // if (oldAvatar) {
  //   if (oldAvatar !== avatar) {
  //     await UploadService.removeUploadedFile(oldAvatar._id)
  //   }
  // }

  const profile = await ProfileService.updateProfile(user, body, avatar)
  ctx.body = profile.toObject()
}

export default {
  ProfileDetails,
  EditProfile,
}