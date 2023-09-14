import { SentEmail } from "./index.types"
import { Email } from "./email"

export abstract class TestableEmailService {
  private emails: SentEmail[] = []

  public get sentEmails(): SentEmail[] {
    return this.emails
  }

  public clearSentEmails() {
    this.emails = []
  }

  protected storeEmail(to: string, email: Email) {
    this.emails.push({ to, email })
  }
}
