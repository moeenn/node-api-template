import { FastifyPlugin } from "@/core/server/plugins"
import { ForgotPasswordController } from "./forgotPasswordController"

export const ForgotPasswordRouter: FastifyPlugin = (app, _opts, next) => {
  app.post("/request-reset", ForgotPasswordController.requestPasswordReset)
  app.post(
    "/validate-reset-token",
    ForgotPasswordController.validatePasswordResetToken,
  )
  app.post("/reset-password", ForgotPasswordController.resetForgottenPassword)

  next()
}
