import { ISubscription } from "./index.types"
import { ISocket } from "@/vendor/entities/sockets/socket"

export class Subscription implements ISubscription {
  public readonly name: string
  private sockets: ISocket[]

  constructor(name: string) {
    this.name = name
    this.sockets = []
  }

  /**
   *  allow a new socket to subscribe to the subscription
   *
   */
  public subscribe(socket: ISocket) {
    const [exists] = this.sockets.filter((s) => s.id === socket.id)
    if (exists) return

    this.sockets.push(socket)
  }

  /**
   *  remove socket from subscription
   *
   */
  public unsubscribe(socket: ISocket) {
    this.sockets = this.sockets.filter((s) => s.id !== socket.id)
  }

  /**
   *  push a message to all sockets subscribed to the current subscription
   *
   */
  public publish(payload: unknown) {
    for (const socket of this.sockets) {
      socket.send({
        type: this.name,
        payload,
      })
    }
  }
}
