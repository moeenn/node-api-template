import { User } from "@prisma/client"
import { IEvent } from "@/core/entities/event"
import { Auth } from "@/core/helpers/auth"
import { SetFirstPasswordEmail } from "@/app/emails/setFirstPasswordEmail"
import { EmailService } from "@/core/email"
import { logger } from "@/core/server/logger"

export class SetFirstPasswordEvent implements IEvent {
  constructor(private readonly user: User) {}

  public async process(): Promise<void> {
    const token = await Auth.generateFirstPasswordToken(this.user.id)
    const email = new SetFirstPasswordEmail({ passwordToken: token.token })

    /** don't await, send in the background */
    EmailService.instance.sendEmail(this.user.email, email)
    logger.info(
      { email: this.user.email },
      "sending email for setting first password",
    )
  }
}
