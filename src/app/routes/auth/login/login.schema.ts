import { authConfig } from "@/app/config"
import { FromSchema } from "json-schema-to-ts"

export const bodySchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string", minLength: authConfig.password.minLength },
    /** for mobile, only allow gatekeepers to login */
    gatekeeperOnly: { type: "boolean" },
  },
  required: ["email", "password"],
  additionalProperties: false,
} as const

export type Body = FromSchema<typeof bodySchema>
