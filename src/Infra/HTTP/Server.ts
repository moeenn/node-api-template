import koa, { DefaultState, DefaultContext } from "koa"
import koaBody from "koa-body"
import cors from "@koa/cors"
import { LoggerServiceInstance } from "@/Infra/Logger"
import { bearerToken } from "koa-bearer-token"
import { HandleErrors, Logger } from "@/Infra/HTTP/Middleware"
import { UploadConfig } from "@/Application/Config"
import { router } from "@/Infra/HTTP/Routes"

export type Context = DefaultContext
export type Next = DefaultState
export type Middleware = (ctx: Context, next: Next) => Promise<void>
export type Server = koa<DefaultState, DefaultContext>

export class ServerFactory {
  private app: Server

  constructor() {
    this.app = new koa()
    this.app.silent = true
    const bodyOptions = {
      multipart: true,
      jsonLimit: UploadConfig.maxFileSize * 1024 * 1024 /* in bytes */,
      formidable: {
        maxFileSize: UploadConfig.maxFileSize * 1024 * 1024 /* in bytes */,
      },
    }

    this.app
      .use(Logger)
      .use(HandleErrors)
      .use(cors())
      .use(koaBody(bodyOptions))
      .use(bearerToken())
      .use(router.routes())
      .use(router.allowedMethods())
  }

  public run(port: string) {
    this.app.listen(port, () =>
      LoggerServiceInstance.log(`Server started on port ${port}`),
    )
  }
}
