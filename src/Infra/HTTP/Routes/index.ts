import Router from "@koa/router"
import UsersController from "@src/Infra/HTTP/Controllers/UsersController"

function init(): Router {
  const router = new Router()

  router.get("/", UsersController.List)
	router.post("/", UsersController.Create)
	router.delete("/:id", UsersController.Delete)

  return router
}

export default init()