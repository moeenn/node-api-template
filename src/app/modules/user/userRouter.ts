import { FastifyPlugin } from "@/core/server/plugins"
import { UserController } from "./userController"

export const UserRouter: FastifyPlugin = (app, _opts, next) => {
  app.get("/", UserController.listUsers)
  app.get("/profile", UserController.getUserProfile)
  app.post("/register", UserController.registerUser)
  app.post("/set-status", UserController.setUserStatus)
  app.put("/profile", UserController.updateUserProfile)

  next()
}
