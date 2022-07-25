import Router from "@koa/router"
import { ValidateToken, HasRole } from "@/Middleware"
import {
  AuthController,
  UserController,
  ForgotPasswordController
} from "@/Controllers"

function init(): Router {
  const routes = new Router({ prefix: "/api" })

  /* auth routes */
  routes.post("/register", AuthController.Register)
  routes.post("/login", AuthController.Login)
  routes.get("/logout", ValidateToken, AuthController.Logout)
  routes.post("/forgot-password", ForgotPasswordController.RequestReset)
  routes.post("/forgot-password/reset", ForgotPasswordController.ResetPassword)

  /* admin routes */
  routes.get("/users", ValidateToken, HasRole(["admin"]), UserController.All)
  routes.post("/users/toggle-approved", ValidateToken, HasRole(["admin"]), UserController.ToggleApprovedStatus)

  return routes
}

export default init()