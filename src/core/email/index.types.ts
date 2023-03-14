import { Email } from "./Email"

export type SentEmail = {
  to: string
  email: Email
}

export interface IEmailProvider {
  sendEmail: (to: string, email: Email) => void
}
