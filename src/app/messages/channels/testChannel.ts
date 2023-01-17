import { Channel } from "@/vendor/entities/sockets/channel"
import { channelBusInstance } from "@/vendor/entities/sockets/channelBus"

interface ITestChannel {
  key: string
  value: string
}

export const testChannel = new Channel<ITestChannel>("test", channelBusInstance)
