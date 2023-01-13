import { env } from "@/vendor/helpers"

export const appConfig = {
  appName: "Sample Application" /* TODO: set an actual name */,
  frontendURL: env("FRONT_END_URL"),
}
