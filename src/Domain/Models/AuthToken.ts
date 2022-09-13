import mongoose, { Schema, Document, PopulatedDoc } from "mongoose"
import autopopulate from "mongoose-autopopulate"
import { IUser } from "."

interface IAuthToken extends Document {
  user: PopulatedDoc<IUser & Document>,
  token: string,
}

const schema = new Schema(
  {
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
    }
  }
)

schema.plugin(autopopulate)
const AuthToken = mongoose.model<IAuthToken>("auth-tokens", schema)
export { AuthToken, IAuthToken }