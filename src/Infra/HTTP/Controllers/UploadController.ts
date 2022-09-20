import { Context } from "@/Infra/HTTP/Server"
import { Upload } from "@/Domain/Models"
import { validate } from "@/Application/Helpers"
import { Exception } from "@/Application/Classes"
import { z, objectid } from "@/Application/Helpers/Validator"

/**
 *  get information about an upload
 * 
*/
async function GetUpload(ctx: Context) {
  const params = validate(
    ctx.params,
    z.object(
      {
        id: z.string().refine(objectid.handler, objectid.options),
      }
    )
  )

  const upload = await Upload.actions.getUploadByID(params.id)
  ctx.body = upload
}

/**
 *  upload a new file to S3 storage
 * 
*/
async function NewUpload(ctx: Context) {
  if (!(ctx.request.files && ctx.request.files.file)) {
    throw new Exception("upload file missing", 422, {
      message: "please make sure the key of the uploaded file is 'file'",
    })
  }

  const upload = await Upload.actions.createNewUpload(ctx.request.files.file)
  ctx.body = upload
}

/**
 *  remove an uploaded file from S3 storage
 * 
*/
async function RemoveUpload(ctx: Context) {
  const params = validate(
    ctx.params,
    z.object(
      {
        id: z.string().refine(objectid.handler, objectid.options),
      }
    )
  )

  await Upload.actions.removeUploadedFile(params.id)
  ctx.body = {
    message: "file deleted successfully"
  }
}

export default {
  GetUpload,
  NewUpload,
  RemoveUpload,
}