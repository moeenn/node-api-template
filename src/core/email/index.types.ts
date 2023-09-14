import { Email } from "./email"

export type SentEmail = {
  to: string
  email: Email
}

export interface IEmailProvider {
  sendEmail: (to: string, email: Email) => void
}
