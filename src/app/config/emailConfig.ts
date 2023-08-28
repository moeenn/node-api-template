import { env } from "@/core/helpers"
import { DummyEmailProvider } from "@/core/email/providers"

export const emailConfig = {
  fromEmail: env("FROM_EMAIL"),
  provider: DummyEmailProvider, // TODO: implement dummy email provider
}
