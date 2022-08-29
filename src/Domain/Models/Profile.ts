import { Schema, PopulatedDoc, Document } from "mongoose"
import { IUpload } from "." 

interface IProfile extends Document {
  name: string,
  description?: string,
  avatar?: PopulatedDoc<IUpload & Document>,
}

const ProfileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    avatar: {
      type: Schema.Types.ObjectId,
      ref: "uploads",
      required: false,
    },
  }
)

export { IProfile, ProfileSchema }