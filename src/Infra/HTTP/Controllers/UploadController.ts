import { Context } from "@/Infra/HTTP/Server"
import { UploadService } from "@/Domain/ModelServices"
import { validate } from "@/Application/Helpers"
import { Exception } from "@/Application/Classes"

/**
 *  get information about an upload
 * 
*/
async function GetUpload(ctx: Context) {
  const params = validate(ctx.params, {
    id: "objectid|required",
  })

  const upload = await UploadService.getUploadByID(params.id)
  ctx.body = upload.toObject()
}

/**
 *  upload a new file to S3 storage
 * 
*/
async function NewUpload(ctx: Context) {
  if (!(ctx.request.files && ctx.request.files.file)) {
    console.log("file", ctx.request.files)
    throw new Exception("upload file missing", 422)
  }

  const upload = await UploadService.createNewUpload(ctx.request.files.file)
  ctx.body = upload.toObject()
}

/**
 *  remove an uploaded file from S3 storage
 * 
*/
async function RemoveUpload(ctx: Context) {
  const params = validate(ctx.params, {
    id: "objectid|required",
  })

  await UploadService.removeUploadedFile(params.id)
  ctx.body = {
    message: "file deleted successfully"
  }
}

export default {
  GetUpload,
  NewUpload,
  RemoveUpload,
}