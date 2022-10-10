import { Email } from "@/Infra/Email"
import { AppConfig } from "@/Application/Config"

/**
 *  new users are added to the system by admin or institute
 *  when they are added, we generate a random password for their account
 *  and email it to them
 */
export class UserRegisteredEmail extends Email {
  constructor(userEmail: string, password: string) {
    super("Account Created", "user-registered", {
      frontend_url: AppConfig.frontend_url,
      user_email: userEmail,
      user_password: password,
    })
  }
}
