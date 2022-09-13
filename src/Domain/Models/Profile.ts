import { Schema, PopulatedDoc, Document } from "mongoose"
import autopopulate from "mongoose-autopopulate"
import { IUpload } from "."

interface IProfile {
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
      autopopulate: true,
    },
  }
)

ProfileSchema.plugin(autopopulate)
export { IProfile, ProfileSchema }