import { env } from "@/core/helpers"

export const storageConfig = {
  region: env("AWS_REGION"),
  bucketName: env("AWS_S3_BUCKET"),
}
