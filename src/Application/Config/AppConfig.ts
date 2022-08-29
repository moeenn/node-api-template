import { env } from "@/Application/Helpers" 

export const AppConfig = {
  website_name: env("WEBSITE_NAME"),
  frontend_url: env("FRONTEND_URL"),
}