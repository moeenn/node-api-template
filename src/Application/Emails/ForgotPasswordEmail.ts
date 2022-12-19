import { Email } from "@/Vendor/Entities/Email"

interface IForgotPasswordEmailArgs {
  appName: string
  resetLink: string
}

export class ForgotPasswordEmail extends Email {
  subject = "Forgot Password"

  constructor(private args: IForgotPasswordEmailArgs) {
    super()
  }

  template(): string {
    return `
# Reset forgotten password
A request was made for resetting the password of your account for ${this.args.appName}. Please click the following link to reset your account password.

[Reset Password](${this.args.resetLink})

**Note**: If you did not request a password reset for your account, you can safely ignore this email.
`
  }
}
