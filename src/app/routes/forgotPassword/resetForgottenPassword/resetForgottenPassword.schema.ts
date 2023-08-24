import { FromSchema } from "json-schema-to-ts"
import { authConfig } from "@/app/config"

export const bodySchema = {
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

export type Body = FromSchema<typeof bodySchema>
