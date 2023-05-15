import { env } from "@/core/helpers"
import { AWSEmailProvider } from "@/core/email/providers"

export const emailConfig = {
  provider: AWSEmailProvider,
  fromEmail: env("FROM_EMAIL"),
}
