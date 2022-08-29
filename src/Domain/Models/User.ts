import mongoose, { Schema, Document } from "mongoose"
import { IProfile, ProfileSchema } from "./Profile"

type IUserRole = "admin" | "user"

interface IUser extends Document {
  email: string,
  user_role: IUserRole,
  password: string,
  approved: boolean,
  profile: IProfile,
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
      enum: ["admin", "user"],
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
    },
    profile: ProfileSchema,
  }
)

const User = mongoose.model<IUser>("users", schema)
export { User, IUser, IUserRole } 