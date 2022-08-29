import { DefaultContext, DefaultState } from "koa"
import { Exception } from "@/Application/Classes"

/**
 *  handle any unhandled / deliberate exceptions thrown inside the request 
 *  handlers
*/
async function HandleErrors(ctx: DefaultContext, next: DefaultState) {
  try {
    await next()
  } catch (err) {
    ctx.type = "json"

    /* for some season, err instanceof Exception returns false */
    if ((err as Error).constructor.name === "Exception") {
      const { status, message, details } = err as Exception
      ctx.status = status
      ctx.body = { message, details }
      return 
    }

    console.error(err)
    ctx.status = 500
    ctx.body = { message: (err as Error).message }
    ctx.app.emit("error", err, ctx)
  }
}

export default HandleErrors