import { EmailService } from "./index.service"
import { EmailConfig } from "@/Application/Config"

function init(): EmailService {
  const { key, secret, region, from_address } = EmailConfig
  return new EmailService(from_address, region, key, secret)
}

export const EmailServiceInstance = init()
export { Email } from "./index.types"
export { ForgotPasswordEmail } from "./Emails/ForgotPasswordEmail"
export { UserRegisteredEmail } from "./Emails/UserRegisteredEmail"
