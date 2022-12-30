import { PasswordToken } from "@prisma/client"
import { User } from "@/domain/user"

export { PasswordToken }
export type PasswordTokenWithRelations = PasswordToken & { user: User }

export { passwordTokenService } from "./passwordTokenService"
