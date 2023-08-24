import { FromSchema } from "json-schema-to-ts"

export const querySchema = {
  type: "object",
  properties: {
    page: { type: "integer" }, // optional
    query: { type: "string" }, // optional
  },
  additionalProperties: false,
} as const

export type Query = FromSchema<typeof querySchema>
