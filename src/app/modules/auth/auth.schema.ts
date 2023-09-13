import { authConfig } from "@/app/config"
import { FromSchema } from "json-schema-to-ts"

export const LoginSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string", minLength: authConfig.password.minLength },
  },
  required: ["email", "password"],
  additionalProperties: false,
} as const

export type Login = FromSchema<typeof LoginSchema>


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