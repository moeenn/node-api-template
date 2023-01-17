import { IChannel } from "./index.types"
import { ISocket } from "@/vendor/entities/sockets/socket"
import { IChannelBus } from "@/vendor/entities/sockets/channelBus"

/**
 *  channel is a generic class because the payload type for messages
 *  published on the channel will vary between different instances of
 *  channels
 */
export class Channel<T> implements IChannel<T> {
  public readonly name: string
  private channelBus: IChannelBus
  private sockets: ISocket[]

  constructor(name: string, channelBus: IChannelBus) {
    this.name = name
    this.channelBus = channelBus
    this.sockets = []

    /**
     *  register all channel bus events
     *
     */
    this.channelBus.emitter.on(
      "socket.close",
      this.removeClosingSocket.bind(this),
    )
  }

  /**
   *  in the event a socket is closing, remove it from sockets registered
   *  with the current channel
   */
  private removeClosingSocket({ socketID }: { socketID: string }) {
    this.sockets = this.sockets.filter((s) => s.id !== socketID)

    // TODO: remove after testing
    console.log("removing socket", { name: this.name, socketID })
  }

  /**
   *  get a readonly list of subscribed sockets (mainly for testing)
   *
   */
  public getSockets(): ISocket[] {
    return this.sockets
  }

  /**
   *  allow a new socket to subscribe to the channel
   *
   */
  public subscribe(socket: ISocket) {
    const [exists] = this.sockets.filter((s) => s.id === socket.id)
    if (exists) return

    this.sockets.push(socket)
  }

  /**
   *  remove socket from channel
   *
   */
  public unsubscribe(socket: ISocket) {
    this.sockets = this.sockets.filter((s) => s.id !== socket.id)
  }

  /**
   *  push a message to all sockets subscribed to the current channel
   *
   */
  public publish(payload: T) {
    for (const socket of this.sockets) {
      socket.send({
        type: this.name,
        payload,
      })
    }
  }
}
