import { authConfig } from "@/app/config"
import { FromSchema } from "json-schema-to-ts"

export const RequestPasswordResetSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
  },
  required: ["email"],
  additionalProperties: false,
} as const

export type RequestPasswordReset = FromSchema<typeof RequestPasswordResetSchema>

export const ValidatePasswordResetTokenSchema = {
  type: "object",
  properties: {
    token: { type: "string" },
  },
  required: ["token"],
  additionalProperties: false,
} as const

export type ValidatePasswordResetToken = FromSchema<
  typeof ValidatePasswordResetTokenSchema
>

export const ResetForgottenPasswordSchema = {
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
  additionalProperties: false,
} as const

export type ResetForgottenPassword = FromSchema<
  typeof ResetForgottenPasswordSchema
>
