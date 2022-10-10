import { User, IDocumentUser, IUserRole } from "."
import { IProfile } from "@/Domain/Models"
import { Password } from "@/Application/Helpers"
import { Exception } from "@/Application/Exceptions"

interface ICreateUser {
  email: string
  user_role: IUserRole
  password: string
  profile: IProfile
}

/**
 *  get all users
 *
 */
async function getAllUsers(): Promise<IDocumentUser[]> {
  return await User.repo.find()
  // .populate("profile.avatar")
}

/**
 *  get all users of a specific user role
 *
 */
async function getAllUsersByRole(role: IUserRole): Promise<IDocumentUser[]> {
  return await User.repo.find({ user_role: role })
  // .populate("profile.avatar")
}

/**
 *  get a specific user by id and user role
 *
 */
async function getUserByIDAndRole(
  id: string,
  role: IUserRole,
): Promise<IDocumentUser> {
  const user = await User.repo.findOne({
    _id: id,
    user_role: role,
  })
  // .populate("profile.avatar")

  if (!user) {
    throw new Exception("user not found", 404, { user_id: id })
  }

  return user
}

/**
 *  get complete information about a user including are relevant relations
 *
 */
async function getUserByID(id: string): Promise<IDocumentUser> {
  const user = await User.repo.findOne({ _id: id })
  // .populate("profile.avatar")

  if (!user) {
    throw new Exception("user not found", 404, { user_id: id })
  }

  return user
}

/**
 *  register a new user
 *
 */
async function createUser(data: ICreateUser): Promise<IDocumentUser> {
  data.password = await Password.hash(data.password)

  const user = new User.repo(data)
  await user.save()

  return user
}

/**
 *  toggle active status of the provided user
 *
 */
async function toggleUserApprovedStatus(user: IDocumentUser, status: boolean) {
  await user.updateOne({ approved: status })
}

export const UserActions = {
  getAllUsers,
  getAllUsersByRole,
  getUserByIDAndRole,
  getUserByID,
  createUser,
  toggleUserApprovedStatus,
}
