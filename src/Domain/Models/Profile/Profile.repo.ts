import { Schema } from "mongoose"
import autopopulate from "mongoose-autopopulate"

const ProfileSchema = new Schema({
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
})

ProfileSchema.plugin(autopopulate)
export { ProfileSchema }
