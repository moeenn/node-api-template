import { IEmailProvider, Email } from "@/core/email"
import { logger } from "@/core/server/logger"

export class DummyEmailProvider implements IEmailProvider {
  constructor() {}

  /**
   * this method is not marked async because the email must always be sent
   * in the background. we dont want this method to be awaited because
   * it will slow down the response to the client
   */
  public sendEmail(to: string, email: Email) {
    const body = email.html()
    /** send out email HTML as email body */
    logger.info({ to, body })
  }
}
