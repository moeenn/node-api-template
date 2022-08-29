import mongoose, { Schema, PopulatedDoc, Document } from "mongoose"
import { IUser } from "."

interface IPasswordReset extends Document {
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

const PasswordReset = mongoose.model<IPasswordReset>("password-resets", schema)
export { PasswordReset, IPasswordReset } 
