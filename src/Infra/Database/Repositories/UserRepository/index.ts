import { User } from "@src/Domain/Entities/User"
import Queries from "./Queries"
import Transforms from "./Transforms"

/**
 *  get all users from the DB
 * 
*/
async function List(): Promise<User[]> {
  const rows = await Queries.List()
  return Transforms.Multiple(rows)
}

/**
 *  find a user by ID
 * 
*/
async function Find(id: string): Promise<User | undefined> {
  const rows = await Queries.Find(id)
  return Transforms.Single(rows)
}

/**
 *  find a user by email
 * 
*/
async function FindByEmail(email: string): Promise<User | undefined> {
  const rows = await Queries.FindByEmail(email)
  return Transforms.Single(rows)
}

/**
 *  create a new user in DB
 * 
*/
async function Create(user: User): Promise<void> {
  await Queries.Create(user)
}

/**
 *  remove a user from DB
 * 
*/
async function Delete(id: string): Promise<void> {
  await Queries.Delete(id)
}

export default {
  List,
  Find,
  FindByEmail,
  Create,
  Delete,
}