import { Context } from "@/Infra/HTTP/Server" 
import { LabService } from "@/Domain/ModelServices"
import { validate } from "@/Application/Helpers"

/**
 *  get details of a single lab
 * 
*/
async function GetLab(ctx: Context) {
  const params = validate(ctx.params, {
    id: "objectid|string",
  })

  const course = await LabService.getLabByID(params.id)
  ctx.body = course.toObject()
}

/**
 *  list out all labs within a course
 * 
*/
async function ListLabs(ctx: Context) {
  const params = validate(ctx.params, {
    id: "objectid|required",
  })

  const labs = await LabService.getCourseLabs(params.id)
  ctx.body = labs
}

/**
 *  create a new lab
 * 
*/
async function CreateLab(ctx: Context) {
  const body = validate(ctx.request.body, {
    custom_id: "string|required",
    name: "string|required",
    description: "string|required",
    start_date: "date|required",
    end_date: "date|required",
    course_id: "objectid|string",
    "attachments.*.attachment_type": "string|in:file,simulation|required",
    "attachments.*.file_id": "objectid",
    "attachments.*.simulation_id": "objectid",
  })

  const lab = await LabService.createCourseLab(body)

  ctx.status = 201
  ctx.body = lab.toObject()  
}

/**
 *  update an existing lab
 * 
*/
async function UpdateLab(ctx: Context) {
  const params = validate(ctx.params, {
    id: "objectid|required",
  })

  let lab = await LabService.getLabByID(params.id)

  const body = validate(ctx.request.body, {
    custom_id: "string|required",
    name: "string|required",
    description: "string|required",
    start_date: "date|required",
    end_date: "date|required",
    course_id: "objectid|string",
    "attachments.*.attachment_type": "string|in:file,simulation|required",
    "attachments.*.file_id": "objectid",
    "attachments.*.simulation_id": "objectid",    
  })

  lab = await LabService.updateCourseLab(lab, body)
  ctx.body = lab.toObject()
}

/**
 *  delete a lab from the system
 * 
*/
async function DeleteLab(ctx: Context) {
  const params = validate(ctx.params, {
    id: "objectid|required",
  })

  await LabService.deleteLabByID(params.id)
  ctx.body = {
    message: "resource deleted successfully"
  }
}

export default {
  ListLabs,
  GetLab,
  CreateLab,
  UpdateLab,
  DeleteLab,
}