import AWS from "aws-sdk"
import EventEmitter from "node:events"
import { IEmailService ,IPayload } from "./index.types"
import { Email } from "@/Infra/Email"

export class EmailService implements IEmailService {
  private emitter: EventEmitter
  private eventName: string

  private sesInstance: AWS.SES
  private fromEmail: string

  public constructor(
    from: string,
    region: string,
    keyID: string,
    secret: string,
  ) {
    this.fromEmail = from
    this.eventName = "email"

    this.emitter = new EventEmitter()
    this.emitter.addListener(this.eventName, this.emitEmail.bind(this))

    const config: AWS.SES.ClientConfiguration = {
      apiVersion: "2010-12-01",
      accessKeyId: keyID,
      secretAccessKey: secret,
      region: region,
    }

    this.sesInstance = new AWS.SES(config)
  }

  /**
   *  action to be performed by the event emitter, when a new email is received
   *  for sending
  */
  private emitEmail(payload: IPayload) {
    this.prepareEmail(payload.to, payload.email)
  }

  /**
   *  email provider method: use AWS SES for sending out the email
   * 
  */
  private async prepareEmail(
    to: string,
    email: Email,
  ): Promise<AWS.SES.SendEmailResponse> {
    const body = await email.body()

    const params: AWS.SES.SendEmailRequest = {
      Source: this.fromEmail,
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

    return await this.sesInstance.sendEmail(params).promise()
  }

  /**
   *  hand off the email to the event emitter so it can be sent in the 
   *  background
  */
  sendEmail(to: string, email: Email) {
    this.emitter.emit(this.eventName, { to, email })
  }
}
