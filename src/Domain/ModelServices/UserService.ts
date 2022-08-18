import { User, IUser, IUserRole } from "@/Domain/Models"
import { Password } from "@/Application/Helpers"

/**
 *  get all users
 * 
*/
async function getAllUsers(): Promise<IUser[]> {
  return await User.find()
}

/**
 *  get all users of a specific user role
 * 
*/
async function getAllUsersByRole(role: IUserRole): Promise<IUser[]> {
  return await User.find({ user_role: role })
}

/**
 *  get a specific user by id and user role
 * 
*/
async function getUserByIDAndRole(id: string, role: IUserRole): Promise<IUser> {
  const user = await User.findOne({
    _id: id,
    user_role: role,
  })

  if (!user) {
    throw new Error(`invalid user id: ${id}`)
  }

  return user
}

/**
 *  register a new user
 * 
*/
async function createUser(data: IUser): Promise<IUser> {
  data.password = await Password.hash(data.password)

  const user = new User(data)
  await user.save()

  return user
}

export default {
  getAllUsers,
  getAllUsersByRole,
  getUserByIDAndRole,
  createUser,
}