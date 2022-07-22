import koa, { DefaultState, DefaultContext } from "koa"
import koaBody from "koa-body"
import cors from "@koa/cors"
import Logger, { log } from "@/Core/Logger"
import { bearerToken } from "koa-bearer-token"
import { HandleErrors } from "@/Middleware"
import router from "@/Routes/Routes"

export type Context = DefaultContext
export type Next = DefaultState
export type Middleware = (ctx: Context, next: Next) => Promise<void>
export type Server = koa<DefaultState, DefaultContext>

function create(): Server {
  const app = new koa()
  app.silent = true

  app
    .use(Logger)
    .use(HandleErrors)
    .use(cors())
    .use(koaBody())
    .use(bearerToken())
    .use(router.routes())
    .use(router.allowedMethods())

  return app
}

function run(server: Server, port: string): void {
  server.listen(port, () => log(`Server started on port ${port}`))
}

export default {
  create,
  run,
}