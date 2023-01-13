import { MessageDefinition } from "@/vendor/entities/sockets"
import { echo } from "./echo"

export const messageDefinitions: MessageDefinition[] = [
  { type: "echo", handler: echo },
]
