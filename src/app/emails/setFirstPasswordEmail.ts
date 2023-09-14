import { Email } from "@/core/email"

export type SetFirstPasswordEmailArgs = {
  passwordToken: string
}

export class SetFirstPasswordEmail extends Email {
  constructor(public readonly args: SetFirstPasswordEmailArgs) {
    super("Account setup")
  }

  template(): string {
    return `
# Account setup
You account has been successfully created for ${this.appConfig.appName}. Please click on the following link to setup your account. 

[Setup account](${this.appConfig.urls.accountSetup}${this.args.passwordToken})
`
  }
}
