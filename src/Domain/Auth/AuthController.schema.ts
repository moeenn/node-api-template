import { z } from "zod"
import { User } from "@/Domain/User"

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export type ILogin = z.infer<typeof LoginSchema>

export interface ILoginResponse {
  user: User
  token: string
}
