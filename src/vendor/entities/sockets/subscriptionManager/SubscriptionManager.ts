import { ISocket } from "@/vendor/entities/sockets"
import {
  Subscription,
  ISubscription,
} from "@/vendor/entities/sockets/subscription"
import { ISubscriptionManager } from "./index.types"

export class SubscriptionManager implements ISubscriptionManager {
  private subscriptions: ISubscription[]

  constructor() {
    this.subscriptions = []
  }

  /**
   *  in all registered subscriptions, find a single subscription using
   *  its name
   *
   */
  private findSubscription(name: string): ISubscription | undefined {
    const [sub] = this.subscriptions.filter((s) => s.name === name)
    return sub
  }

  /**
   *  provision a subscription: if already exists, return that, otherwise
   *  create a new one
   *
   */
  private findOrCreateSubscription(name: string): ISubscription {
    const exists = this.findSubscription(name)
    if (exists) return exists

    this.registerSubscription(name)
    return this.findSubscription(name) as ISubscription
  }

  /**
   *  create a new subscription
   *
   */
  private registerSubscription(name: string) {
    const exists = this.findSubscription(name)
    if (exists) return

    const sub = new Subscription(name)
    this.subscriptions.push(sub)
  }

  /**
   *  close a subscription channel
   *
   */
  public closeSubscription(name: string) {
    this.subscriptions = this.subscriptions.filter((s) => s.name !== name)
  }

  /**
   *  add a new socket to an existing subscription
   *
   */
  public subscribe(name: string, socket: ISocket) {
    const sub = this.findOrCreateSubscription(name)
    sub.subscribe(socket)
  }

  /**
   *  remove a socket from an existing subscription
   *
   */
  public unsubscribe(name: string, socket: ISocket) {
    const sub = this.findSubscription(name)
    if (!sub) return

    sub.unsubscribe(socket)
  }

  /**
   *  remove all subscriptions for a provided socket
   *
   */
  public unsubscribeAll(socket: ISocket) {
    for (const sub of this.subscriptions) {
      sub.subscribe(socket)
    }
  }

  /**
   *  send a message to all sockets who have subscribed to a subscription
   *
   */
  public publish(name: string, payload: unknown) {
    const sub = this.findSubscription(name)
    if (!sub) return

    sub.publish(payload)
  }
}
