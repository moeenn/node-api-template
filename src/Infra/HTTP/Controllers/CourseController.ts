import { Context } from "@/Infra/HTTP/Server"
import { validate } from "@/Application/Helpers"
import { InstituteService, CourseService, UploadService } from "@/Domain/ModelServices"
import StorageService from "@/Infra/Storage"

/**
 *  get a single course based on its ID
 * 
*/
async function GetOne(ctx: Context) {
  const params = validate(ctx.params, {
    id: "objectid|string",
  })

  const course = await CourseService.getCourseByID(params.id)
  ctx.body = course.toObject()
}

/**
 *  list all courses within an institute
 *  
*/
async function ListAll(ctx: Context) {
  const user = ctx.state["user"]

  const institute = (user.user_role === "institute")
    ? user
    : await InstituteService.getUserInstitute(user)

  const courses = await CourseService.getCoursesByInstitute(institute)
  ctx.body = courses
}

/**
 *  create a new course
 * 
*/
async function Create(ctx: Context) {
  const body = validate(ctx.request.body, {
    custom_id: "string|required",
    name: "string|required",
    description: "string|required",
    image_id: "objectid",
    "teachers.*": "objectid|required",
    "students.*": "objectid|required",
  })

  const user = ctx.state["user"]

  const image = (body.image_id) 
    ? await UploadService.getUploadByID(body.image_id)
    : undefined

  const course = await CourseService.createCourse(body, user, image)
  ctx.status = 201
  ctx.body = course.toObject()
}

/**
 *  update an existing course
 * 
*/
async function Update(ctx: Context) {
  const params = validate(ctx.params, {
    id: "objectid|string",
  })

  const body = validate(ctx.request.body, {
    custom_id: "string|required",
    name: "string|required",
    description: "string|required",
    "teachers.*": "objectid|required",
    "students.*": "objectid|required",
  })

  let course = await CourseService.getCourseByID(params.id)

  const oldImage = course.image
  const image = (body.image_id) 
    ? await UploadService.getUploadByID(body.image_id)
    : undefined

  if (oldImage) {
    if (oldImage !== image) {
      await UploadService.removeUploadedFile(oldImage.url)
    }
  }

  course = await CourseService.updateCourse(course, body, image)
  ctx.body = course.toObject()
}

/**
 *  delete an existing course
 * 
*/
async function Delete(ctx: Context) {
  const params = validate(ctx.params, {
    id: "objectid|string",
  })

  const course = await CourseService.getCourseByID(params.id)
  if (course.image) {
    await StorageService.remove(course.image)
  }

  await course.delete()
  ctx.body = {
    message: "resource deleted successfully"
  }
}

export default {
  ListAll,
  GetOne,
  Create,
  Update,
  Delete,
}