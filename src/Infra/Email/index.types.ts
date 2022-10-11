import { Email } from "./Email"

export interface IEmailService {
  sendEmail: (to: string, email: Email) => void
}

export interface IPayload {
  to: string
  email: Email
}
