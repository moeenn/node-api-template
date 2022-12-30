import { User } from "@prisma/client"
import { UserRole } from "@/domain/userRole"
import { Role } from "@/domain/role"

export { userService } from "./userService"
export { userController } from "./userController"
export {
  RegisterUserSchema,
  IRegisterUser,
  ApproveDisapproveUserSchema,
  IApproveDisapproveUser,
} from "./userController.schema"

export { User }
export type UserWithRelations = User & { roles: (UserRole & { role: Role })[] }
export type UserWithoutPassword = Omit<UserWithRelations, "password">
