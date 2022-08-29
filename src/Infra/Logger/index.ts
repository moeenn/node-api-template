import { DefaultContext, Next } from "koa"

function getTime(): string {
  const time = new Date()
  return `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`
}

export function log(message: string, details: unknown = undefined) {
  const time = getTime()
  const output = `${time} - ${message}`

  if (details) {
    console.log(`${output} - ${JSON.stringify(details)}`)
    return
  }

  console.log(output)
}

/**
 *  log some basic information about the request to the stdout
 * 
*/
export default async function Logger(ctx: DefaultContext, next: Next) {
  await next()
  const { method, url, status } = ctx
  log(`${method}: ${url} - ${status}`)
}