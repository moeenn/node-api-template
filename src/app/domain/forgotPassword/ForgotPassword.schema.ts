import { FromSchema } from "json-schema-to-ts"
import { authConfig } from "@/app/config"

export const RequestPasswordResetRequestSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
  },
  required: ["email"],
} as const

export type RequestPasswordResetRequest = FromSchema<
  typeof RequestPasswordResetRequestSchema
>

export const ValidateTokenRequestSchema = {
  type: "object",
  properties: {
    token: { type: "string" },
  },
  required: ["token"],
} as const

export type ValidateTokenRequest = FromSchema<typeof ValidateTokenRequestSchema>

export const ResetForgottenPasswordRequestSchema = {
  type: "object",
  properties: {
    token: { type: "string" },
    password: { type: "string", minLength: authConfig.password.minLength },
    confirmPassword: {
      type: "string",
      minLength: authConfig.password.minLength,
    },
  },
  required: ["token", "password", "confirmPassword"],
} as const

export type ResetForgottenPasswordRequest = FromSchema<
  typeof ResetForgottenPasswordRequestSchema
>
