import { DefaultContext, DefaultState } from "koa"

interface ResponseError extends Error {
  status?: number,
}

/**
 *  handle any unhandled exceptions thrown inside the request handlers
 * 
*/
async function HandleErrors(ctx: DefaultContext, next: DefaultState) {
  try {
    await next()
  } catch (err) {

    const { status, message } = err as ResponseError
    ctx.status = (status) ? status : 500
    ctx.body = { error: message }

    console.error(err)
    ctx.type = "json"
    ctx.app.emit("error", err, ctx)
  }
} 

export default HandleErrors