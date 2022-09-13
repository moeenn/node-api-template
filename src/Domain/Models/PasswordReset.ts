import mongoose, { Schema, PopulatedDoc, Document } from "mongoose"
import autopopulate from "mongoose-autopopulate"
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
const PasswordReset = mongoose.model<IPasswordReset>("password-resets", schema)
export { PasswordReset, IPasswordReset } 
