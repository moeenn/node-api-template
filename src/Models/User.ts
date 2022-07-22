import mongoose, { Schema } from "mongoose"

type IUserRole = "admin" | "client"

interface IUser {
  email: string,
  user_role: IUserRole,
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
    user_role: {
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