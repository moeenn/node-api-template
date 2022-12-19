import { User } from "@/Domain/User"
import { Role } from "@/Domain/Role"

export type UserWithoutPassword = Omit<User, "password">

export interface ICreateUserArgs {
  email: string
  name: string
  roles: Role[]
}
