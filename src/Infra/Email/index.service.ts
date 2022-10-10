import AWS from "aws-sdk"
import { Email } from "@/Infra/Email"

/**
 *  TODO:
 *  - inject instance of global event bus in this service
 *  - email templates should be defined inside the email class (in md format)
 */
export class EmailService {
  private ses_instance: AWS.SES
  private from_email: string

  public constructor(
    from: string,
    region: string,
    keyID: string,
    secret: string,
  ) {
    this.from_email = from

    const config: AWS.SES.ClientConfiguration = {
      apiVersion: "2010-12-01",
      accessKeyId: keyID,
      secretAccessKey: secret,
      region: region,
    }

    this.ses_instance = new AWS.SES(config)
  }

  async sendEmail(
    to: string,
    email: Email,
  ): Promise<AWS.SES.SendEmailResponse> {
    const body = await email.body()

    const params: AWS.SES.SendEmailRequest = {
      Source: this.from_email,
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
    }

    return await this.ses_instance.sendEmail(params).promise()
  }
}
