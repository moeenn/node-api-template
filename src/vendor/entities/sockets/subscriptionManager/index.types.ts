import { ISocket } from "@/vendor/entities/sockets"

export interface ISubscriptionManager {
  subscribe: (name: string, socket: ISocket) => void
  unsubscribe: (name: string, socket: ISocket) => void
  unsubscribeAll: (socket: ISocket) => void
  publish: (name: string, payload: unknown) => void
  closeSubscription: (name: string) => void
}
