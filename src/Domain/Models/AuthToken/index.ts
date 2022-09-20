export { IAuthToken, IDocumentAuthToken } from "./AuthToken.types"
import AuthTokenRepo from "./AuthToken.repo"

export default {
  repo: AuthTokenRepo,
}