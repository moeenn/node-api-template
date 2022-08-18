import { env } from "@/Application/Helpers"

export default {
  host: env("SERVER_HOST"),
  port: env("SERVER_PORT"),
}