import { Password } from "@/Application/Helpers"
import { User, IUser, IUserRole } from "@/Domain/Models"
import { ICreateUser } from "./index.types"
import { Exception } from "@/Application/Classes"

/**
 *  get all users
 * 
*/
async function getAllUsers(): Promise<IUser[]> {
  return await User
    .find()
    .populate("profile.avatar")
}

/**
 *  get all users of a specific user role
 * 
*/
async function getAllUsersByRole(role: IUserRole): Promise<IUser[]> {
  return await User
    .find({ user_role: role })
    .populate("profile.avatar")
}

/**
 *  get a specific user by id and user role
 * 
*/
async function getUserByIDAndRole(id: string, role: IUserRole): Promise<IUser> {
  const user = await User
    .findOne({
      _id: id,
      user_role: role,
    })
    .populate("profile.avatar")

  if (!user) {
    throw new Exception("user not found", 404, { user_id: id })
  }

  return user
}

/**
 *  get complete information about a user including are relevant relations
 *  
*/
async function getUserByID(id: string) {
  const user = await User
    .findOne({ _id: id })
    .populate("profile.avatar")

  if (!user) {
    throw new Exception("user not found", 404, { user_id: id })
  }

  return user
}

/**
 *  register a new user
 * 
*/
async function createUser(data: ICreateUser): Promise<IUser> {
  data.password = await Password.hash(data.password)

  const user = new User(data)
  await user.save()

  return user
}

/**
 *  toggle active status of the provided user
 * 
*/
async function toggleUserApprovedStatus(user: IUser, status: boolean) {
  await user.updateOne({ approved: status })
}

export default {
  getAllUsers,
  getAllUsersByRole,
  getUserByIDAndRole,
  getUserByID,
  createUser,
  toggleUserApprovedStatus,
}