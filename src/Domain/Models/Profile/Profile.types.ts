import { PopulatedDoc, Document } from "mongoose"
import { IUpload } from "@/Domain/Models"

export interface IProfile {
  name: string
  description?: string
  avatar?: PopulatedDoc<IUpload & Document>
}
