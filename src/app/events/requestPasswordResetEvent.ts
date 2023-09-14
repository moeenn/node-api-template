import { User } from "@prisma/client"
import { IEvent } from "@/core/entities/event"
import { Auth } from "@/core/helpers/auth"
import { ForgotPasswordEmail } from "@/app/emails/forgotPasswordEmail"
import { EmailService } from "@/core/email"
import { logger } from "@/core/server/logger"

export class RequestPasswordResetEvent implements IEvent {
  constructor(private readonly user: User) {}

  public async process(): Promise<void> {
    const token = await Auth.generatePasswordResetToken(this.user.id)
    const email = new ForgotPasswordEmail({ resetToken: token.token })

    EmailService.instance.sendEmail(this.user.email, email)
    logger.info(
      { email: this.user.email },
      "sending forgot password (password reset) email",
    )
  }
}
