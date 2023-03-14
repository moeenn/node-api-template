import { FromSchema } from "json-schema-to-ts"
import { authConfig } from "@/app/config"

export const LoginRequestSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: {
      type: "string",
      minLength: authConfig.password.minLength,
    },
  },
  required: ["email", "password"],
} as const

export type LoginRequest = FromSchema<typeof LoginRequestSchema>

export const SetFirstPasswordRequestSchema = {
  type: "object",
  properties: {
    passwordToken: { type: "string" },
    password: { type: "string", minLength: authConfig.password.minLength },
    confirmPassword: {
      type: "string",
      minLength: authConfig.password.minLength,
    },
  },
  required: ["passwordToken", "password", "confirmPassword"],
} as const

export type SetFirstPasswordRequest = FromSchema<
  typeof SetFirstPasswordRequestSchema
>
