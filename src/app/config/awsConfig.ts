import { env } from "@/core/helpers"

export const awsConfig = {
  accessKey: env("AWS_ACCESS_KEY_ID"),
  accessSecret: env("AWS_SECRET_ACCESS_KEY"),
  region: "eu-west-2",
}
