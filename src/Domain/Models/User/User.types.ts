import { Document } from "mongoose"
import { IProfile } from "@/Domain/Models/Profile"

export type IUserRole = "admin" | "user"

export interface IUser {
  email: string,
  user_role: IUserRole,
  password: string,
  approved: boolean,
  profile: IProfile,
}

export interface IDocumentUser extends IUser, Document {}