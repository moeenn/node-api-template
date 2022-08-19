import { User, IUser, IUserRole } from "@/Domain/Models"
import { Password } from "@/Application/Helpers"
import { Exception } from "@/Application/Classes"

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
 *  get a single user using user id
 * 
*/
async function getUserByID(id: string): Promise<IUser> {
  const user = await User.findOne({ _id: id })
  if (!user) {
    throw new Exception("user not found", 404, { user_id: id })
  }

  return user
}

/**
 *  get a single user by email address
 * 
*/
async function getUserByEmail(email: string): Promise<IUser> {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Exception("user not found", 404, { email })
  }

  return user
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
    throw new Exception("user not found", 404, { user_id: id })
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

/**
 *  approve / disable user
 * 
*/
async function toggleUserActiveStatus(user: IUser, status: boolean) {
  await user.updateOne({ approved: status })
}

export default {
  getAllUsers,
  getAllUsersByRole,
  getUserByID,
  getUserByEmail,
  getUserByIDAndRole,
  createUser,
  toggleUserActiveStatus,
}