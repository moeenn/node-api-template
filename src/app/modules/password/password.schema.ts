import { FromSchema } from "json-schema-to-ts"
import { authConfig } from "@/app/config"

export const UpdateUserPasswordSchema = {
  type: "object",
  properties: {
    password: { type: "string", minLength: authConfig.password.minLength },
    confirmPassword: {
      type: "string",
      minLength: authConfig.password.minLength,
    },
  },
  required: ["password", "confirmPassword"],
  additionalProperties: false,
} as const

export type UpdateUserPassword = FromSchema<typeof UpdateUserPasswordSchema>

export const SetFirstPasswordSchema = {
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
  additionalProperties: false,
} as const

export type SetFirstPassword = FromSchema<typeof SetFirstPasswordSchema>

export const CheckPasswordStrengthSchema = {
  type: "object",
  properties: {
    password: { type: "string" },
  },
  required: ["password"],
  additionalProperties: false,
} as const

export type CheckPasswordStrength = FromSchema<
  typeof CheckPasswordStrengthSchema
>
