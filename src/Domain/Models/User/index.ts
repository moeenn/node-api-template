export { IUser, IDocumentUser, IUserRole } from "./User.types"
import { UserRepo } from "./User.repo"
import { UserActions } from "./User.actions"

export const User = {
  repo: UserRepo,
  actions: UserActions,
}
