import mongoose, { Schema, Document } from "mongoose"

interface IUpload extends Document {
  url: string
}

const schema = new Schema(
  {
    url: {
      type: String,
      required: true,
      index: true,
    }
  }
)

const Upload = mongoose.model<IUpload>("uploads", schema)
export { Upload, IUpload }