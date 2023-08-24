import { FromSchema } from "json-schema-to-ts"

export const bodySchema = {
  type: "object",
  properties: {
    email: { type: "string" },
  },
  required: ["email"],
  additionalProperties: false,
} as const

export type Body = FromSchema<typeof bodySchema>
