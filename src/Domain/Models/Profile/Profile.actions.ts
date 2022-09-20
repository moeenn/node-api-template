import { PopulatedDoc, Document } from "mongoose"
import { User, IDocumentUser, IUpload  } from "@/Domain/Models"
import { Password } from "@/Application/Helpers"

interface IUpdateProfileData {
  email: string,
  password?: string,
  profile: {
    name: string,
    description?: string,
    avatar?: PopulatedDoc<IUpload & Document>,
  }
}

/**
 *  edit a user's profile
 * 
*/
async function updateProfile(
  user: IDocumentUser, 
  data: IUpdateProfileData, 
  avatar: IUpload | undefined
): Promise<IDocumentUser> {

  if (data.password) {
    data.password = await Password.hash(data.password)
  }

  data.profile.avatar = avatar
  await user.updateOne(data)

  return await User.actions.getUserByID(user._id)
}

export default {
  updateProfile,
}