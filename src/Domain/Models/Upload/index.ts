export { IUpload, IDocumentUpload } from "./Upload.types"
import { UploadRepo } from "./Upload.repo"
import { UploadActions } from "./Upload.actions"

export const Upload = {
  repo: UploadRepo,
  actions: UploadActions,
}
