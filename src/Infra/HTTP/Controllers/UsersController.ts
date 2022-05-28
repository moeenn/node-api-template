import { DefaultContext } from "koa"
import UsersRepository from "@src/Infra/Database/Repositories/UserRepository"
import http from "http-status"

async function List(ctx: DefaultContext): Promise<void> {
  ctx.body = await UsersRepository.List() ?? []
}

async function Find(ctx: DefaultContext): Promise<void> {
  const { id } = ctx.params
  const result = await UsersRepository.Find(id)

  if (!result) {
    ctx.status = http.NOT_FOUND
    ctx.body = { message: http["404_MESSAGE"] }
    return 
  }

  ctx.body = result
}

async function Delete(ctx: DefaultContext): Promise<void> {
  const { id } = ctx.request.params
  await UsersRepository.Delete(id)

  ctx.status = http.GONE
  ctx.body = { message: "User deleted successfully" }
}

export default {
  List,
  Find,
  Delete,
}