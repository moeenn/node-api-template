import { Role } from "@/Domain/Role"

export interface ICreateUserArgs {
  email: string
  name: string
  roles: Role[]
}
