import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"
import { IEmailProvider, Email } from "@/core/email"
import { awsConfig, emailConfig } from "@/app/config"
import { logger } from "@/core/server/logger"

/**
 * TODO: test by sending out an actual email
 * migrated from sdk v2 -> v3
 */
export class AWSEmailProvider implements IEmailProvider {
  private sesInstance: SESClient

  constructor() {
    /**
     * SDK credentials are automatically picked up from the environment
     * variables
     */
    this.sesInstance = new SESClient({
      region: awsConfig.region,
    })
  }

  /**
   * this method is not marked async because the email must always be sent
   * in the background. we dont want this method to be awaited because
   * it will slow down the response to the client
   */
  public sendEmail(to: string, email: Email) {
    const body = email.html()
    const command = new SendEmailCommand({
      Source: emailConfig.fromEmail,
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: body,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: email.subject,
        },
      },
    })

    this.sesInstance.send(command).catch((err) => {
      logger.error({
        message: "email sending failed",
        to,
        subject: email.subject,
        details: err,
      })
    })
  }
}
