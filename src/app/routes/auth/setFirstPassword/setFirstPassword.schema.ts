import { authConfig } from "@/app/config"
import { FromSchema } from "json-schema-to-ts"

export const bodySchema = {
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

export type Body = FromSchema<typeof bodySchema>
