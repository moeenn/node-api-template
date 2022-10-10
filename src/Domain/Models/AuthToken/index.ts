export { IAuthToken, IDocumentAuthToken } from "./AuthToken.types"
import { AuthTokenRepo } from "./AuthToken.repo"
import { AuthTokenActions } from "./AuthToken.actions"

export const AuthToken = {
  repo: AuthTokenRepo,
  actions: AuthTokenActions,
}
