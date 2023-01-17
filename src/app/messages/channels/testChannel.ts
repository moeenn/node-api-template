import { Channel } from "@/vendor/entities/sockets/channel"
import { ChannelBus } from "@/vendor/entities/sockets/channelBus"

interface ITestChannel {
  key: string
  value: string
}

export const testChannel = new Channel<ITestChannel>(
  "test",
  ChannelBus.instance(),
)
