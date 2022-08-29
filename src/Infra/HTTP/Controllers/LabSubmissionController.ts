import { Context } from "@/Infra/HTTP/Server"
import { LabService, LabSubmissionService } from "@/Domain/ModelServices"
import { validate } from "@/Application/Helpers"

/**
 *  allow student to make a submission to a lab
 * 
*/
async function SubmitLabWork(ctx: Context) {
  const body = validate(ctx.request.body, {
    lab_id: "objectid|string",
    document_id: "objectid|required",
  })

  const student = ctx.state["user"]
  const submission = await LabSubmissionService.submitLabWork(
    student, 
    body.lab_id,
    body.document_id
  )

  ctx.body = submission.toObject()
}

/**
 *  allow student to update the file submitted for a due lab
 * 
*/
async function UpdateSubmittedLabWork(ctx: Context) {
  const params = validate(ctx.params, {
    id: "objectid|required",
  })

  const body = validate(ctx.request.body, {
    document_id: "objectid|required",
  })

  const student = ctx.state["user"]
  const submission = await LabSubmissionService.updateSubmittedLabWork(
    student,
    params.id,
    body.document_id,
  )

  ctx.body = submission.toObject()
}

/**
 *  list out all lab work submissions made by the current user
 * 
*/
async function ListUserSubmissions(ctx: Context) {
  const student = ctx.state["user"]
  const submissions = await LabSubmissionService.listStudentSubmissions(student)

  ctx.body = submissions
}

/**
 *  list out all submissions on a lab by all students
 * 
*/
async function ListLabSubmissions(ctx: Context) {
  const params = validate(ctx.params, {
    id: "objectid|required",
  })

  const lab = await LabService.getLabByID(params.id)
  const submissions = await LabSubmissionService.listLabSubmissions(lab)

  ctx.body = submissions
}

/**
 *  assign grade to a lab submission
 * 
*/
async function AssignLabSubmissionGrade(ctx: Context) {
  const params = validate(ctx.params, {
    id: "objectid|required",
  })

  const body = validate(ctx.request.body, {
    grade: "integer|min:0|max:10|required",
  })

  let submission = await LabSubmissionService.getLabSubmissionByID(params.id)
  submission = await LabSubmissionService.assignLabSubmissionGrade(
    submission, 
    body.grade
  )

  ctx.body = submission.toObject()
}

export default {
  SubmitLabWork,
  UpdateSubmittedLabWork,
  ListUserSubmissions,
  ListLabSubmissions,
  AssignLabSubmissionGrade,
}