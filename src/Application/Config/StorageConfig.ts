import { env } from "@/Application/Helpers" 

export const StorageConfig = {
  key: env("AWS_ACCESS_KEY_ID"),
  secret: env("AWS_ACCESS_SECRET"),
  bucket: env("S3_BUCKET_NAME"),
} 