import { Email } from "@/Vendor/Entities/Email"

interface ISetFirstPasswordEmailArgs {
  appName: string
  frontendURL: string
  resetPath: string
  resetToken: string
}

export class SetFirstPasswordEmail extends Email {
  constructor(private args: ISetFirstPasswordEmailArgs) {
    super("Account setup")
  }

  template(): string {
    return `
# Account setup
You account has been successfully created for ${this.args.appName}. Please click on the following link to setup your account. 

[Setup account](${this.args.frontendURL}${this.args.resetPath}?token=${this.args.resetToken})
`
  }
}
