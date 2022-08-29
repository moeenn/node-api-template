import { env } from "@/Application/Helpers" 

export const ServerConfig = {
  port: env("SERVER_PORT"),
}