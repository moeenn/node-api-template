import { PopulatedDoc, Document } from "mongoose"
import { IUser } from "@/Domain/Models"

export interface IAuthToken {
  user: PopulatedDoc<IUser & Document>,
  token: string,
}

export interface IDocumentAuthToken extends IAuthToken, Document {}