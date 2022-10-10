import mongoose, { Schema } from "mongoose"
import { ProfileSchema } from "@/Domain/Models/Profile"
import { IDocumentUser } from "./User.types"

const schema = new Schema({
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
})

export const UserRepo = mongoose.model<IDocumentUser>("users", schema)
