import { Container } from "typedi"
import { AuthConfig } from "@/Application/Config"
import { z } from "zod"

const authConfig = Container.get(AuthConfig)

export const RequestPasswordResetSchema = z.object({
  email: z.string().email(),
})
export type IRequestPasswordReset = z.infer<typeof RequestPasswordResetSchema>

export const ValidateTokenSchema = z.object({
  token: z.string(),
})
export type IValidateToken = z.infer<typeof ValidateTokenSchema>

export const ResetForgottenPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(authConfig.passwords_min_length),
  confirm_password: z.string().min(authConfig.passwords_min_length),
})
export type IResetForgottenPassword = z.infer<
  typeof ResetForgottenPasswordSchema
>
