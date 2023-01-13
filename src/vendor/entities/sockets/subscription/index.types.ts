import { ISocket } from "@/vendor/entities/sockets"

export interface ISubscription {
  name: string
  subscribe: (socket: ISocket) => void
  unsubscribe: (socket: ISocket) => void
  publish: (payload: unknown) => void
}
