export { IAuthToken, IDocumentAuthToken } from "./AuthToken.types"
import AuthTokenRepo from "./AuthToken.repo"
import AuthTokenActions from "./AuthToken.actions"

export default {
  repo: AuthTokenRepo,
  actions: AuthTokenActions,
}