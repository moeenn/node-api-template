import { ISocket } from "./socket"

export interface IMessage {
  type: string
  payload: unknown
}

export type MessageHandler = (
  socket: ISocket,
  payload: unknown,
) => Promise<void>
