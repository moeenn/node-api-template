import { ISocket } from "@/vendor/entities/sockets"

export interface IChannel<T> {
  name: string
  subscribe: (socket: ISocket) => void
  unsubscribe: (socket: ISocket) => void
  publish: (payload: T) => void
}
