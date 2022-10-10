import mime from "mime-types"
import fs from "fs/promises"
import { StorageServiceInstance, IFile } from "@/Infra/Storage"
import { Upload, IDocumentUpload } from "."
import { Exception } from "@/Application/Exceptions"

/**
 *  get details of a single upload
 *
 */
async function getUploadByID(id: string): Promise<IDocumentUpload> {
  const upload = await Upload.repo.findOne({ _id: id })
  if (!upload) {
    throw new Exception("upload not found", 404, {
      upload_id: id,
    })
  }

  return upload
}

/**
 *  recive the incoming file and directly upload it to S3 bucket
 *
 */
async function createNewUpload(file: IFile): Promise<IDocumentUpload> {
  const { filepath, newFilename, mimetype } = file

  const ext = mime.extension(mimetype)
  const content = await fs.readFile(filepath)

  const dest = `${newFilename}.${ext}`
  const fileURL = await StorageServiceInstance.save(dest, content)

  const upload = new Upload.repo({ url: fileURL })
  await upload.save()

  /* cleanup: delete file from tmp folder */
  await fs.unlink(filepath)
  return upload
}

/**
 *  remove an upload from S3 storage
 *
 */
async function removeUploadedFile(id: string) {
  const upload = await getUploadByID(id)
  await StorageServiceInstance.remove(upload.url)
  await upload.deleteOne()
}

export const UploadActions = {
  getUploadByID,
  createNewUpload,
  removeUploadedFile,
}
