import mongoose, { Schema, Document } from "mongoose"

type IUserRole = "admin" | "client"

interface IUser extends Document {
  email: string,
  role: IUserRole,
  password: string,
  approved: boolean,
}

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    role: {
      type: String,
      enum: ["admin", "client"],
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    approved: {
      type: Boolean,
      default: true,
    }
  }
)

const User = mongoose.model<IUser>("users", schema)
export { User, IUser, IUserRole } 