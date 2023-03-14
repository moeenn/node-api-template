import { FromSchema } from "json-schema-to-ts"
import { authConfig } from "@/app/config"
import { UserRole } from "@prisma/client"

export const CreateSiteUserRequestSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string" },
    role: {
      enum: ["SUB_CONTRACTOR", "GATE_KEEPER"],
    },
  },
  required: ["name", "email", "role"],
} as const

export type CreateSiteUserRequest = FromSchema<typeof CreateSiteUserRequestSchema>

export const ApproveDisapproveUserRequestSchema = {
  type: "object",
  properties: {
    userId: { type: "integer" },
    status: { type: "boolean" },
  },
  required: ["userId", "status"],
} as const

export type ApproveDisapproveUserRequest = FromSchema<
  typeof ApproveDisapproveUserRequestSchema
>

export const UpdateProfileRequestSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    skype: { type: "string" },
    phone: { type: "string" },
    mobile: { type: "string" },
  },
} as const

export type UpdateProfileRequest = FromSchema<typeof UpdateProfileRequestSchema>

export const UpdatePasswordRequestSchema = {
  type: "object",
  properties: {
    password: { type: "string", minLength: authConfig.password.minLength },
    confirmPassword: {
      type: "string",
      minLength: authConfig.password.minLength,
    },
  },
  required: ["password", "confirmPassword"],
} as const

export type UpdatePasswordRequest = FromSchema<
  typeof UpdatePasswordRequestSchema
>

export const RemoveUserRequestSchema = {
  type: "object",
  properties: {
    userId: { type: "integer" },
  },
  required: ["userId"],
} as const

export type RemoveUserRequest = FromSchema<typeof RemoveUserRequestSchema>

export type CreateUserArgs = {
  email: string
  name: string
  role: UserRole
}

export type CreateSiteUserArgs = CreateUserArgs & {
  siteId: number
}

export type UpdateProfileArgs = Partial<{
  name: string
  skype: string
  phone: string
  mobile: string
}>
