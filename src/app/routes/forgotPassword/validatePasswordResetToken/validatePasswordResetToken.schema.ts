import { FromSchema } from "json-schema-to-ts"

export const bodySchema = {
  type: "object",
  properties: {
    token: { type: "string" },
  },
  required: ["token"],
  additionalProperties: false,
} as const

export type Body = FromSchema<typeof bodySchema>
