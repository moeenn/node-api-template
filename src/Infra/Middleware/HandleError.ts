import { ServerError } from "@src/Application/Types/Errors"
import { DefaultContext, DefaultState } from "koa"

export async function HandleError(ctx: DefaultContext, next: DefaultState): Promise<void> {
  try {
    await next()
  } catch (err) {
    if (err instanceof ServerError) {
      const { status, message, details }: ServerError = err
      ctx.status = status
      ctx.body = { message, details }
    } else {
      ctx.status = 500
      ctx.body = err
    }

    ctx.type = "json"
    ctx.app.emit("error", err, ctx)
  }
} 