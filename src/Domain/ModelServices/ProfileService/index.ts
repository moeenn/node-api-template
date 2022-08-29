import { IUser, IUpload } from "@/Domain/Models"
import { UserService } from "@/Domain/ModelServices"
import { Password } from "@/Application/Helpers"
import { IUpdateProfileData} from "./index.types"

/**
 *  edit a user's profile
 * 
*/
async function updateProfile(
  user: IUser, 
  data: IUpdateProfileData, 
  avatar: IUpload | undefined
): Promise<IUser> {

  if (data.password) {
    data.password = await Password.hash(data.password)
  }

  data.profile.avatar = avatar
  await user.updateOne(data)

  return await UserService.getUserByID(user._id)
}

export default {
  updateProfile,
}