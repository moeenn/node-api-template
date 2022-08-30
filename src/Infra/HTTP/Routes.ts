import Router from "@koa/router"
import { ValidateToken, HasRole } from "@/Infra/HTTP/Middleware"
import {
  AuthController,
  UserController,
  ForgotPasswordController,
  ProfileController,
  UploadController,
} from "@/Infra/HTTP/Controllers"

function init(): Router {
  const routes = new Router({ prefix: "/api" })

  /* auth routes */
  routes.post("/register", UserController.RegisterUser)
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
  routes.post("/toggle-approved", ValidateToken, HasRole("admin"), UserController.ToggleApprovedStatus)

  /* profile routes */
  routes.get("/profile", ValidateToken, ProfileController.ProfileDetails)
  routes.post("/profile", ValidateToken, ProfileController.EditProfile)

  return routes
}

export default init()