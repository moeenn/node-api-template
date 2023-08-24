import { FromSchema } from "json-schema-to-ts"

export const bodySchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    phone: { type: "string" },
    mobile: { type: "string" },
  },
  required: ["name"],
  additionalProperties: false,
} as const

export type Body = FromSchema<typeof bodySchema>
