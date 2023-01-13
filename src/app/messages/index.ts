import { MessageHandler } from "@/vendor/entities/sockets"
import { echo } from "./echo"

export const registeredMessages: Map<string, MessageHandler> = new Map([
  ["echo", echo],
])
