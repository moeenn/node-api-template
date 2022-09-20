export { IPasswordReset, IDocumentPasswordReset } from "./PasswordReset.types"
import PasswordResetRepo from "./PasswordReset.repo"

export default {
  repo: PasswordResetRepo,
}