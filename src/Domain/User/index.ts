import { User } from "@prisma/client"
import { UserRole } from "@/Domain/UserRole"
import { Role } from "@/Domain/Role"

export { UserService } from "./UserService"
export { UserController } from "./UserController"
export {
  RegisterUserSchema,
  IRegisterUser,
  ApproveDisapproveUserSchema,
  IApproveDisapproveUser,
} from "./UserController.schema"

export { User }
export type UserWithRelations = User & { roles: (UserRole & { role: Role })[] }
export type UserWithoutPassword = Omit<UserWithRelations, "password">
