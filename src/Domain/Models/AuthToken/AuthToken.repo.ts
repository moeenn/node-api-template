import mongoose, { Schema } from "mongoose"
import autopopulate from "mongoose-autopopulate"
import { IDocumentAuthToken } from "./AuthToken.types"

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
    autopopulate: true,
  },
  token: {
    type: String,
    index: true,
    required: true,
  },
})

schema.plugin(autopopulate)
export const AuthTokenRepo = mongoose.model<IDocumentAuthToken>(
  "auth-tokens",
  schema,
)
