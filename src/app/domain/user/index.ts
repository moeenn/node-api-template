import { User } from "@prisma/client"
import { Password } from "@prisma/client"
export { UserService } from "./User.service"
export { UserController } from "./User.controller"
export * from "./User.schema"

export { User }
export type UserWithPassword = User & { password: Password | null }
