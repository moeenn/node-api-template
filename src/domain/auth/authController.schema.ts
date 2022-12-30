import { authConfig } from "@/app/config"
import { z } from "zod"
import { User } from "@/domain/user"

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(10),
})
export type ILogin = z.infer<typeof LoginSchema>

export interface ILoginResponse {
  user: User
  token: string
}

export const SetFirstPasswordSchema = z.object({
  password_token: z.string(),
  password: z.string().min(authConfig.password.minLength),
  confirm_password: z.string().min(authConfig.password.minLength),
})
export type ISetFirstPassword = z.infer<typeof SetFirstPasswordSchema>
