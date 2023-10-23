import { FastifyPlugin } from "@/core/server/plugins"
import { PasswordController } from "./passwordController"

export const PasswordRouter: FastifyPlugin = (app, _opts, next) => {
  app.post("/update", PasswordController.updateUserPassword)
  app.post("/create", PasswordController.setFirstPassword)
  app.post("/check-strength", PasswordController.checkPasswordStrength)

  next()
}
