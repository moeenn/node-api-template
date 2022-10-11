import ejs, { Data } from "ejs"
import { AppConfig } from "@/Application/Config"

export class Email {
  public template: string
  public subject: string
  public variables: Record<string, unknown>

  constructor(
    subject: string,
    template: string,
    variables: Record<string, unknown>,
  ) {
    const { website_name } = AppConfig

    this.template = template
    this.subject = `${website_name} - ${subject}`
    this.variables = { website_name, ...variables }
  }

  private renderTemplate(params: Data): string {
    const html: string = ejs.render(this.template, params)
    return html
  }

  body(): string {
    return this.renderTemplate(this.variables)
  }
}
