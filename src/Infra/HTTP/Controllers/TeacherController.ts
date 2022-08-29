import { Context } from "@/Infra/HTTP/Server"
import { TeacherService } from "@/Domain/ModelServices"

/**
 *  list out all courses assigned to the teacher
 * 
*/
async function GetTeacherCourses(ctx: Context) {
  const teacher = ctx.state["user"]
  const courses = await TeacherService.getTeacherAssignedCourses(teacher)

  ctx.body = courses
}

export default {
  GetTeacherCourses,
}