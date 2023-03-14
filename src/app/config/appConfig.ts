import { env } from "@/core/helpers"
const frontendURL = env("FRONT_END_URL")

export const appConfig = {
  appName: "Delivery Management System",
  frontendURL,
  urls: {
    resetPassword: frontendURL + "forgot-password/reset?token=",
    accountSetup: frontendURL + "account-setup?token=",
  },
}
