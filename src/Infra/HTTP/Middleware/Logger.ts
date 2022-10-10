import { DefaultContext, Next } from "koa"
import { LoggerServiceInstance } from "@/Infra/Logger"

/**
 *  log some basic information about the incoming requests
 *
 */
export async function Logger(ctx: DefaultContext, next: Next) {
  await next()
  const { method, url, status } = ctx
  LoggerServiceInstance.log(`${method}: ${url} - ${status}`)
}
