import { env } from "@/Application/Helpers"

export const DatabaseConfig = {
  host: env("MONGO_HOST"),
  port: env("MONGO_PORT"),
  db: env("MONGO_DATABASE"),
  username: env("MONGO_USERNAME"),
  password: env("MONGO_PASSWORD"),
}
