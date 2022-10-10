import { Email } from "@/Infra/Email"
import { AppConfig, AuthConfig } from "@/Application/Config"

/**
 *  when a user forgets their password and requests a password reset, this email
 *  is sent to them
 */
export class ForgotPasswordEmail extends Email {
  constructor(resetToken: string) {
    super("Recover Password", "forgot-password", {
      frontend_url: AppConfig.frontend_url,
      frontend_reset_page: AuthConfig.frontend_reset_page,
      reset_token: resetToken,
    })
  }
}
