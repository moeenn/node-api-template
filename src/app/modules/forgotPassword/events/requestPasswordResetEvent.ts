import { User } from "@prisma/client"
import { IEvent } from "@/core/entities/event"
import { Auth } from "@/core/helpers/auth"
import { RequestPasswordResetEmail } from "@/app/modules/forgotPassword/emails/RequestPasswordResetEmail"
import { EmailService } from "@/core/email"
import { logger } from "@/core/server/logger"

/**
 * when a user has forgotten their account password and wish to reset it, we
 * fire off this event. It will send out an email to the user with instructions
 * to set a new account password.
 */
export class RequestPasswordResetEvent implements IEvent {
  constructor(private readonly user: User) {}

  public async process(): Promise<void> {
    const token = await Auth.generatePasswordResetToken(this.user.id)
    const email = new RequestPasswordResetEmail({ resetToken: token.token })

    EmailService.instance.sendEmail(this.user.email, email)
    logger.info(
      { email: this.user.email },
      "sending forgot password (password reset) email",
    )
  }
}
