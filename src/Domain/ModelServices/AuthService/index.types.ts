import { IUser } from "@/Domain/Models"

export interface ILoginData {
  email: string, 
  password: string,
}

export interface ILoginResult {
  user: IUser,
  token: string,
}

export interface IResetPasswordData {
  token: string,
  password: string,
}