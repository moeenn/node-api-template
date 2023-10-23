import { Email } from "@/core/email"

export type RequestPasswordResetEmailArgs = {
  resetToken: string
}

export class RequestPasswordResetEmail extends Email {
  constructor(public readonly args: RequestPasswordResetEmailArgs) {
    super("Forgot Password")
  }

  template(): string {
    return `
# Reset forgotten password
A request was made for resetting the password of your account for ${this.appConfig.appName}. Please click the following link to reset your account password.

[Reset Password](${this.appConfig.urls.resetPassword}${this.args.resetToken})

**Note**: If you did not request a password reset for your account, you can safely ignore this email.
`
  }
}
