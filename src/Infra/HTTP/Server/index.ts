import koa, { DefaultState, DefaultContext } from "koa"
import koaBody from "koa-body"
import logger from "koa-logger"
import router from "@src/Infra/HTTP/Routes"
import { HandleError } from "@src/Infra/HTTP/Middleware/HandleError"

type Server = koa<DefaultState, DefaultContext>

function Create(): Server {
	const app = new koa()
	app.silent = true

  app
    .use(logger())
    .use(HandleError)
    .use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods())

  return app
}

function Run(server: Server, port: string): void {
  server.listen(port, () => console.log(`Server started on port ${port}`))
}

export default {
  Create,
  Run,
}