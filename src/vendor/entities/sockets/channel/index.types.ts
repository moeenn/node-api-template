import { ISocket } from "@/vendor/entities/sockets"

// TODO: generic should be bounded
export interface IChannel<T> {
  name: string
  subscribe: (socket: ISocket) => void
  unsubscribe: (socket: ISocket) => void
  publish: (payload: T) => void
}
