import { Context } from "@/Core/Server"

/**
 *  report an error to the client
 * 
*/
function report(ctx: Context, error: unknown, details = {}, status = 400) {
  ctx.status = status
  const body: {
    message?: string,
    details?: Record<string, unknown>
  } = {}

  const isEmpty = (obj: Record<string, unknown>) => Object.keys(obj).length === 0

  if (!isEmpty(details)) body.details = details
  if (error instanceof Error) body.message = error.message

  if (!isEmpty(body)) {
    ctx.body = body
  }
}

export default report