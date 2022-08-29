import { env } from "@/Application/Helpers" 

export const EmailConfig = {
  key: env("AWS_ACCESS_KEY_ID"),
  secret: env("AWS_ACCESS_SECRET"),
  region: env("AWS_REGION"),
  from_address: env("SES_FROM_EMAIL"),
  templates_folder: "src/Infra/Email/Emails/templates",
} 