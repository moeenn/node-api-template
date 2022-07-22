import { DefaultContext, DefaultState } from "koa"

/**
 *  handle any unhandled exceptions thrown inside the request handlers
 * 
*/
async function HandleErrors(ctx: DefaultContext, next: DefaultState) {
  try {
    await next()
  } catch (err) {
    ctx.status = 500

    if (err instanceof Error) {
      ctx.body = { error: err.message }
    }

    console.error(err)
    ctx.type = "json"
    ctx.app.emit("error", err, ctx)
  }
} 

export default HandleErrors