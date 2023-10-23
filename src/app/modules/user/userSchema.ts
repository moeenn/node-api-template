import { FromSchema } from "json-schema-to-ts"
import { authConfig } from "@/app/config/authConfig"

export const ListUsersQuerySchema = {
  type: "object",
  properties: {
    page: { type: "integer" }, // optional
    query: { type: "string" }, // optional
  },
  additionalProperties: false,
} as const

export type ListUsersQuery = FromSchema<typeof ListUsersQuerySchema>

export const UpdateUserProfileSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    phone: { type: "string" },
    mobile: { type: "string" },
  },
  required: ["name"],
  additionalProperties: false,
} as const

export type UpdateUserProfile = FromSchema<typeof UpdateUserProfileSchema>

export const CreateUserSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string" },
    password: { type: "string", minLength: authConfig.password.minLength },
    confirmPassword: { type: "string" },
  },
  required: ["name", "email", "password", "confirmPassword"],
  additionalProperties: false,
} as const

export type CreateUser = FromSchema<typeof CreateUserSchema>

export const SetUserStatusSchema = {
  type: "object",
  properties: {
    userId: { type: "integer" },
    status: { type: "boolean" },
  },
  required: ["userId", "status"],
  additionalProperties: false,
} as const

export type SetUserStatus = FromSchema<typeof SetUserStatusSchema>
