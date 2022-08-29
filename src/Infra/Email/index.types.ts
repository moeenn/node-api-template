import { renderTemplate } from "@/Infra/Email/Utils"
import { AppConfig } from "@/Application/Config"

class Email {
  public template: string
  public subject: string
  public variables: Record<string, unknown>

  constructor(subject: string, template: string, variables: Record<string, unknown>) {
    const { website_name } = AppConfig

    this.template = template
    this.subject = `${website_name} - ${subject}`
    this.variables = { website_name, ...variables }
  }

  async body(): Promise<string> {
    return await renderTemplate(this.template, this.variables)
  }
}

export default Email