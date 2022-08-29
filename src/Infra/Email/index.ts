import EmailService from "./index.service"
import { EmailConfig } from "@/Application/Config"

function init(): EmailService {
  const { key, secret, region, from_address } = EmailConfig
  return new EmailService(from_address, region, key, secret)
}

export default init()
export { default as Email } from "./index.types"
export { default as ForgotPasswordEmail } from "./Emails/ForgotPasswordEmail"
export { default as UserRegisteredEmail } from "./Emails/UserRegisteredEmail"