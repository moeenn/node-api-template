import { Container } from "typedi"
import { AuthConfig } from "@/Application/Config"
import { z } from "zod"
import { User } from "@/Domain/User"

const authConfig = Container.get(AuthConfig)

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
  password: z.string().min(authConfig.passwords_min_length),
  confirm_password: z.string().min(authConfig.passwords_min_length),
})
export type ISetFirstPassword = z.infer<typeof SetFirstPasswordSchema>
