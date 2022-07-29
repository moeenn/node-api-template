import { DefaultContext, Next } from "koa"

function getTime(): string {
  const time = new Date()
  return `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`
}

export function log(message: string) {
  const time = getTime()
  console.log(`${time} - ${message}`)
}

/**
 *  log some basic information about the request to the stdout
 * 
*/
export default async function Logger(ctx: DefaultContext, next: Next) {
  await next()
  const { method, url, status, ip } = ctx
  log(`${ip}: ${method} ${url} (${status})`)
}