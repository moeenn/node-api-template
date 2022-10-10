export { IPasswordReset, IDocumentPasswordReset } from "./PasswordReset.types"
import { PasswordResetRepo } from "./PasswordReset.repo"
import { PasswordResetActions } from "./PasswordReset.actions"

export const PasswordReset = {
  repo: PasswordResetRepo,
  actions: PasswordResetActions,
}
