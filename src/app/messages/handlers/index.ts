import { MessageDefinition } from "@/vendor/entities/sockets"
import { echo } from "./echo"
import { subscribeTestChannel } from "./subscribeTestChannel"
import { updateTestChannel } from "./updateTestChannel"

/**
 *  register all websocket message handlers here
 * 
*/
export const messageDefinitions: MessageDefinition[] = [
  { type: "echo", handler: echo },
  { type: "sub.test", handler: subscribeTestChannel },
  { type: "send.test", handler: updateTestChannel },
]
