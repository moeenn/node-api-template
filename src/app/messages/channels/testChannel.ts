import { Channel } from "@/vendor/entities/sockets/channel"

interface ITestChannel {
  key: string
  value: string
}

export const testChannel = new Channel<ITestChannel>("test")
