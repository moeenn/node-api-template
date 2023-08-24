import { env } from "@/core/helpers"
import { AWSEmailProvider } from "@/core/email/providers"

export const emailConfig = {
  fromEmail: env("FROM_EMAIL"),
  provider: AWSEmailProvider, // TODO: implement dummy email provider
}
