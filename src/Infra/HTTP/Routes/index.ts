import Router from "@koa/router"
import AuthController from "@src/Infra/HTTP/Controllers/AuthController"

function init(): Router {
  const router = new Router()

	router.post("/register", AuthController.Register)
  router.post("/login", AuthController.Login)
  router.post("/logout", AuthController.Logout)

  return router
}

export default init()