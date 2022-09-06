import { DefaultContext, Next } from "koa"
import LoggerService from "@/Infra/Logger"

/**
 *  log some basic information about the incoming requests
 *  
*/
async function Logger(ctx: DefaultContext, next: Next) {
  await next()
  const { method, url, status } = ctx
  LoggerService.log(`${method}: ${url} - ${status}`)
}

export default Logger