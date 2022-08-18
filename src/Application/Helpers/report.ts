import { Context } from "@/Infra/HTTP/Server"

/**
 *  generally, when we want to report an error to the client, we use the following
 *  >> ctx.throw(status, error_message, error_details)
 * 
 *  the roblem with ctx.thow is that error details are nor forwarded to the client
 *  they are only logged to server console.
 * 
 *  the following function is useful when we want to forward error with details
 *  to the client  
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