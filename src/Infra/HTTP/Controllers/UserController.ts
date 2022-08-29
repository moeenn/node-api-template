import { Context } from "@/Infra/HTTP/Server"
import { validate, Random } from "@/Application/Helpers"
import { UserService, UploadService } from "@/Domain/ModelServices"
import { Exception } from "@/Application/Classes"
import { AuthConfig } from "@/Application/Config"
import EmailService, { UserRegisteredEmail } from "@/Infra/Email"

/**
 *  list down all users registered with the system
 * 
*/
async function All(ctx: Context) {
  ctx.body = await UserService.getAllUsers()
}

/**
 *  list down all institutes registered with the system
 * 
*/
async function AllInstitutes(ctx: Context) {
  ctx.body = await UserService.getAllUsersByRole("institute")
}

/**
 *  list down all teachers registered with the system
 * 
*/
async function AllTeachers(ctx: Context) {
  ctx.body = await UserService.getAllUsersByRole("teacher")
}

/**
 *  list down all students registered with the system
 * 
*/
async function AllStudents(ctx: Context) {
  ctx.body = await UserService.getAllUsersByRole("student")
}

/**
 *  get a specific user
 * 
*/
async function GetUser(ctx: Context) {
  const params = validate(ctx.params, {
    id: "objectid|string",
  })

  const user = await UserService.getUserByID(params.id)
  ctx.body = user
}


/**
 *  admin has the right to revoke access of any user at any time, 
 *  this function is used to set the access of any user to the system.
 *  if user.approved is false, use will not be able to access any protected 
 *  resources
*/
async function ToggleApprovedStatus(ctx: Context) {
  const body = validate(ctx.request.body, {
    user_id: "objectid|required",
    status: "boolean|required",
  })

  const user = await UserService.getUserByID(body.user_id)
  const admin = ctx.state["user"]

  if (admin._id.toString() === user._id.toString()) {
    throw new Exception("admin cannot disable their own account", 400, {
      user_id: admin._id,
    })
  }

  await UserService.toggleUserApprovedStatus(user, body.status)
  ctx.body = {
    message: "user approved status updated successfully"
  }
}

/**
 *  register a new institute user
 * 
*/
async function RegisterInstitute(ctx: Context) {
  const body = validate(ctx.request.body, {
    email: "email|string",
    name: "string|required",
    custom_id: "string|required",
    avatar_id: "objectid",
  })

  const avatar = (body.avatar_id)
    ? await UploadService.getUploadByID(body.avatar_id)
    : undefined

  const pwd = Random.string(AuthConfig.passwords.min_length)
  const user = await UserService.createInstitute(body, pwd, avatar)

  await EmailService.sendEmail(
    user.email,
    new UserRegisteredEmail(user.email, pwd)
  )

  ctx.status = 201
  ctx.body = Object.assign({}, user.toObject(), { password: undefined })
}

/**
 *  register a new teacher user
 * 
*/
async function RegisterTeacherStudent(ctx: Context) {
  const body = validate(ctx.request.body, {
    email: "email|string",
    name: "string|required",
    custom_id: "string|required",
    role: "string|in:teacher,student|required",
  })

  const institute = ctx.state["user"]

  const pwd = Random.string(AuthConfig.passwords.min_length)
  const user = await UserService.createTeacherOrStudent(institute, body, pwd)

  await EmailService.sendEmail(
    user.email,
    new UserRegisteredEmail(user.email, pwd)
  )

  ctx.status = 201
  ctx.body = Object.assign({}, user.toObject(), { password: undefined })
}

export default {
  All,
  AllInstitutes,
  AllTeachers,
  AllStudents,
  ToggleApprovedStatus,
  GetUser,
  RegisterInstitute,
  RegisterTeacherStudent,
}