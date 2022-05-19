import { z } from "zod"

export const UserSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
})

export type IUser = z.infer<typeof UserSchema>