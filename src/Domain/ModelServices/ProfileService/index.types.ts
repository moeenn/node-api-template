import { PopulatedDoc, Document } from "mongoose"
import { IUpload } from "@/Domain/Models"

export interface IUpdateProfileData {
  email: string,
  password?: string,
  profile: {
    name: string,
    description?: string,
    avatar?: PopulatedDoc<IUpload & Document>,
  }
}