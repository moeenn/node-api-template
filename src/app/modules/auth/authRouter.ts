import { FastifyPlugin } from "@/core/server/plugins"
import { AuthController } from "./authController"

export const AuthRouter: FastifyPlugin = (app, _opts, next) => {
  app.post("/login", AuthController.login)
  app.get("/refresh-token", AuthController.refreshAuthToken)

  next()
}
