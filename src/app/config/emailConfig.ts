import { env } from "@/core/helpers"
import { DummyEmailProvider } from "@/core/email/providers/dummyEmailProvider"

export const emailConfig = {
  fromEmail: env("FROM_EMAIL"),
  provider: DummyEmailProvider, // TODO: implement actual email provider
}
