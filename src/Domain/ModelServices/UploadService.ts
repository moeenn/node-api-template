import mime from "mime-types"
import fs from "fs/promises"
import StorageService, { IFile } from "@/Infra/Storage"
import { Upload, IUpload } from "@/Domain/Models" 
import { Exception } from "@/Application/Classes"

/**
 *  get details of a single upload
 *  
*/
async function getUploadByID(id: string): Promise<IUpload> {
  const upload = await Upload.findOne({ _id: id })
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
async function createNewUpload(file: IFile): Promise<IUpload> {
  const { filepath, newFilename, mimetype } = file

  const ext = mime.extension(mimetype)
  const content = await fs.readFile(filepath)

  const dest = `${newFilename}.${ext}`
  const fileURL = await StorageService.save(dest, content)

  const upload = new Upload({ url: fileURL })
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
  await StorageService.remove(upload.url)
  await upload.deleteOne()
}

export default {
  getUploadByID,
  createNewUpload,
  removeUploadedFile,
}