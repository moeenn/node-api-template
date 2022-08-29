import mongoose, { Schema, Document, PopulatedDoc } from "mongoose"
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
    },
    token: {
      type: String,
      index: true,
      required: true,
    }
  }
)

const AuthToken = mongoose.model<IAuthToken>("auth-tokens", schema)
export { AuthToken, IAuthToken }