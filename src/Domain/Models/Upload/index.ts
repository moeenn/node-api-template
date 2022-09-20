export { IUpload, IDocumentUpload } from "./Upload.types"
import UploadRepo from "./Upload.repo"
import UploadActions from "./Upload.actions"

export default {
  repo: UploadRepo,
  actions: UploadActions,
}