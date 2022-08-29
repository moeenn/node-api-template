import { Context } from "@/Infra/HTTP/Server"
import { InstituteService } from "@/Domain/ModelServices"

/**
 *  list down all teachers within an institute
 * 
*/
async function AllInstituteTeachers(ctx: Context) {
  const user = ctx.state["user"]

  if (user.user_role === "institute") {
    const teachers = await InstituteService.getInstitutePersonnel(user, "teacher")
    ctx.body = teachers
    return
  }

  if (["teacher", "student"].includes(user.user_role)) {
    const institute = await InstituteService.getUserInstitute(user)
    const teachers = await InstituteService.getInstitutePersonnel(institute, "teacher")

    ctx.body = teachers
    return
  }
}

/**
 *  list down all students within an institute
 * 
*/
async function AllInstituteStudents(ctx: Context) {
  const user = ctx.state["user"]

  if (user.user_role === "institute") {
    const students = await InstituteService.getInstitutePersonnel(user, "student")
    ctx.body = students
    return
  }

  if (["teacher", "student"].includes(user.user_role)) {
    const institute = await InstituteService.getUserInstitute(user)
    const students = await InstituteService.getInstitutePersonnel(institute, "student")

    ctx.body = students
    return
  }
}

export default {
  AllInstituteTeachers,
  AllInstituteStudents,
}