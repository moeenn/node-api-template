import { User } from "@src/Domain/Entities/User"
import Queries from "./Queries"
import Transforms from "./Transforms"

async function List(): Promise<User[]> {
  const rows = await Queries.List()
  return Transforms.List(rows)
}

async function Find(id: string): Promise<User | undefined> {
  const rows = await Queries.Find(id)
  return Transforms.Find(rows)
}

async function Create(user: User): Promise<void> {
  await Queries.Create(user)
}

async function Delete(id: string): Promise<void> {
  await Queries.Delete(id)
}

export default {
  List,
  Find,
  Create,
  Delete,
}