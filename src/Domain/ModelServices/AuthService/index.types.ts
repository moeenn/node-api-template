import { IDocumentUser } from "@/Domain/Models"

export interface ILoginData {
  email: string
  password: string
}

export interface ILoginResult {
  user: IDocumentUser
  token: string
}
