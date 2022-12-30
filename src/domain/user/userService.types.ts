import { Role } from "@/domain/role"

export interface ICreateUserArgs {
  email: string
  name: string
  roles: Role[]
}
