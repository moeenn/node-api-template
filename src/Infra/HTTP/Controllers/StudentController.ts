import { Context } from "@/Infra/HTTP/Server"
import { StudentService } from "@/Domain/ModelServices"

/**
 *  list out all courses a student is enrolled in 
 * 
*/
async function GetStudentCourses(ctx: Context) {
  const student = ctx.state["user"]
  const courses = await StudentService.getStudentEnrolledCourses(student)

  ctx.body = courses
}

/**
 *  list out all labs (from assigned courses) for whom the end_date is in the 
 *  future and the student has not submitted work for this lab
 *  
*/
async function GetStudentDueLabs(ctx: Context) {
  const student = ctx.state["user"]
  const labs = await StudentService.getStudentDueLabs(student)

  ctx.body = labs
}

export default {
  GetStudentCourses,
  GetStudentDueLabs,
}
