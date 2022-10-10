import { Document } from "mongoose"

export interface IUpload {
  url: string
}

export interface IDocumentUpload extends IUpload, Document {}
