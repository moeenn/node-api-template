import { PopulatedDoc, Document } from "mongoose"
import { IUser } from "@/Domain/Models"

export interface IPasswordReset {
  user: PopulatedDoc<IUser & Document>
  token: string
}

export interface IDocumentPasswordReset extends IPasswordReset, Document {}
