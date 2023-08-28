import { FromSchema } from "json-schema-to-ts"
import { authConfig } from "@/app/config/authConfig"

export const bodySchema = {
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

export type Body = FromSchema<typeof bodySchema>
