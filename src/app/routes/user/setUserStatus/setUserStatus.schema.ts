import { FromSchema } from "json-schema-to-ts"

export const bodySchema = {
  type: "object",
  properties: {
    userId: { type: "integer" },
    status: { type: "boolean" },
  },
  required: ["userId", "status"],
  additionalProperties: false,
} as const

export type Body = FromSchema<typeof bodySchema>
