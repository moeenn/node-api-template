import { z } from "zod"

export const RegisterUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  roles: z.array(z.string()),
})
export type IRegisterUser = z.infer<typeof RegisterUserSchema>

export const ApproveDisapproveUserSchema = z.object({
  user_id: z.number(),
  status: z.boolean(),
})
export type IApproveDisapproveUser = z.infer<typeof ApproveDisapproveUserSchema>

export const RemoveUserSchema = z.object({
  user_id: z.number(),
})
export type IRemoveUser = z.infer<typeof RemoveUserSchema>
