import { WebSocket } from "ws"
import { v4 as uuidv4 } from "uuid"
import { ISocket } from "./index.types"

/**
 *  wrapper class to add some additional functionality on top of the websocket
 *  class provided by the ws package
 *
 */
export class Socket implements ISocket {
  public readonly id: string
  public readonly socket: WebSocket

  constructor(socket: WebSocket) {
    this.id = uuidv4()
    this.socket = socket
  }

  send(data: unknown) {
    const payload = JSON.stringify(data)
    this.socket.send(payload)
  }
}
