import { DefaultContext, DefaultState } from "koa"
import Exception from "@/Application/Errors/Exception"

/**
 *  handle any unhandled exceptions thrown inside the request handlers
 * 
*/
async function HandleErrors(ctx: DefaultContext, next: DefaultState) {
  try {
    await next()
  } catch (err) {
    console.error(err)
    ctx.type = "json"
    ctx.app.emit("error", err, ctx)

    if (err instanceof Exception) {
      const { status, message, details } = err
      ctx.status = status
      ctx.body = { message, details }
      return 
    }

    ctx.status = 500
    ctx.body = { message: (err as Error).message }
  }
}

export default HandleErrors