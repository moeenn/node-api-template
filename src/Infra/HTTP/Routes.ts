import Router from "@koa/router"
import { ValidateToken, HasRole } from "@/Infra/HTTP/Middleware"
import {
  AuthController,
  UserController,
  ForgotPasswordController,
  InstituteController,
  SimulationController,
  ProfileController,
  CourseController,
  LabController,
  UploadController,
  StudentController,
  TeacherController,
  LabSubmissionController,
} from "@/Infra/HTTP/Controllers"

function init(): Router {
  const routes = new Router({ prefix: "/api" })

  /* auth routes */
  routes.post("/register/institute", UserController.RegisterInstitute) // TODO: only allow admin to add institute
  routes.post("/register/teacher-student", ValidateToken, HasRole("institute"), UserController.RegisterTeacherStudent)
  routes.post("/login", AuthController.Login)
  routes.get("/logout", ValidateToken, AuthController.Logout)
  routes.post("/forgot-password", ForgotPasswordController.RequestReset)
  routes.post("/forgot-password/reset", ForgotPasswordController.ResetPassword)

  /* file management routes */
  routes.get("/file/:id", ValidateToken, UploadController.GetUpload)
  routes.post("/file/upload", ValidateToken, UploadController.NewUpload)
  routes.delete("/file/:id", ValidateToken, UploadController.RemoveUpload)

  /* admin routes */
  routes.get("/users", ValidateToken, HasRole("admin"), UserController.All)
  routes.get("/users/:id", ValidateToken, UserController.GetUser)
  routes.get("/institutes", ValidateToken, HasRole("admin"), UserController.AllInstitutes)
  routes.get("/teachers", ValidateToken, HasRole("admin"), UserController.AllTeachers)
  routes.get("/students", ValidateToken, HasRole("admin"), UserController.AllStudents)
  routes.post("/toggle-approved", ValidateToken, HasRole("admin"), UserController.ToggleApprovedStatus)

  /* profile routes */
  routes.get("/profile", ValidateToken, ProfileController.ProfileDetails)
  routes.post("/profile/institute", ValidateToken, ProfileController.EditProfile)

  /* institute information routes */
  routes.get("/institute/teachers", ValidateToken, HasRole("institute", "teacher", "student"), InstituteController.AllInstituteTeachers)
  routes.get("/institute/students", ValidateToken, HasRole("institute", "teacher", "student"), InstituteController.AllInstituteStudents)

  /* simulation CRUD routes */
  routes.get("/simulations", ValidateToken, HasRole("admin", "institute", "teacher"), SimulationController.ListAll)
  routes.get("/simulations/:id", ValidateToken, HasRole("admin", "institute", "teacher"), SimulationController.GetOne)
  routes.post("/simulations", ValidateToken, HasRole("admin", "institute", "teacher"), SimulationController.Create)
  routes.put("/simulations/:id", ValidateToken, HasRole("admin", "institute", "teacher"), SimulationController.Update)
  routes.delete("/simulations/:id", ValidateToken, HasRole("admin", "institute", "teacher"), SimulationController.Delete)

  /* courses routes */
  routes.get("/courses", ValidateToken, HasRole("institute", "teacher", "student"), CourseController.ListAll)
  routes.get("/courses/:id", ValidateToken, HasRole("institute", "teacher", "student"), CourseController.GetOne)
  routes.post("/courses", ValidateToken, HasRole("institute", "teacher"), CourseController.Create)
  routes.put("/courses/:id", ValidateToken, HasRole("institute", "teacher"), CourseController.Update)
  routes.delete("/courses/:id", ValidateToken, HasRole("institute", "teacher"), CourseController.Delete)
  routes.get("/student/courses", ValidateToken, HasRole("student"), StudentController.GetStudentCourses)
  routes.get("/teacher/courses", ValidateToken, HasRole("teacher"), TeacherController.GetTeacherCourses)

  /* labs routes */
  routes.get("/labs/course/:id", ValidateToken, LabController.ListLabs)
  routes.get("/labs/:id", ValidateToken, LabController.GetLab)
  routes.post("/labs", ValidateToken, HasRole("institute", "teacher"), LabController.CreateLab)
  routes.put("/labs/:id", ValidateToken, HasRole("institute", "teacher"), LabController.UpdateLab)
  routes.delete("/labs/:id", ValidateToken, HasRole("institute", "teacher"), LabController.DeleteLab)
  routes.get("/lab/due-labs", ValidateToken, HasRole("student"), StudentController.GetStudentDueLabs)

  /* lab submission routes */
  routes.post("/lab/submit", ValidateToken, HasRole("student"), LabSubmissionController.SubmitLabWork)
  routes.get("/lab/submissions", ValidateToken, HasRole("student"), LabSubmissionController.ListUserSubmissions)
  routes.put("/lab/submit/update/:id", ValidateToken, HasRole("student"), LabSubmissionController.UpdateSubmittedLabWork)
  routes.get("/lab/submissions/:id", ValidateToken, HasRole("student"), LabSubmissionController.ListLabSubmissions)
  routes.post("/lab/grade/:id", ValidateToken, HasRole("teacher"), LabSubmissionController.AssignLabSubmissionGrade)

  return routes
}

export default init()