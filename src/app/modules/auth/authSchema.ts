import { authConfig } from "@/app/config"
import { User } from "@prisma/client"
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

export type LoginResult = {
  user: User
  auth: {
    token: string
    expiry: number
  }
}
