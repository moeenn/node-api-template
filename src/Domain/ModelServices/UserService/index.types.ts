import { IUserRole, IProfile } from "@/Domain/Models"

export interface ICreateUser {
  email: string,
  user_role: IUserRole,
  password: string,
  profile: IProfile,
}