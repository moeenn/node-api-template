import { z } from "zod"

export const RegisterUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  roles: z.array(z.string()),
})

export type IRegisterUser = z.infer<typeof RegisterUserSchema>
