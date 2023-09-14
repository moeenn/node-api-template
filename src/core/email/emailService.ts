import { TestableEmailService } from "./testableEmailService"
import { Email } from "./email"
import { emailConfig } from "@/app/config"
import { isTest } from "@/core/helpers"
import { IEmailProvider } from "./index.types"

/**
 * email service is a singleton class,
 * instance method can be used to access the private EmailService instance
 */
export class EmailService extends TestableEmailService {
  private static _instance: EmailService
  private provider: IEmailProvider

  private constructor() {
    super()
    this.provider = new emailConfig.provider()
  }

  /**
   * access the singleton instance using this method
   *
   */
  public static get instance(): EmailService {
    if (!this._instance) {
      this._instance = new EmailService()
    }
    return this._instance
  }

  public sendEmail(to: string, email: Email) {
    if (isTest()) {
      this.storeEmail(to, email)
      return
    }
    this.provider.sendEmail(to, email)
  }
}
