import { DefaultContext } from "koa"
import { User } from "@src/Domain/Entities/User"
import UsersRepository from "@src/Infra/Database/Repositories/UserRepository"
import http from "http-status"

async function List(ctx: DefaultContext): Promise<void> {
  ctx.body = await UsersRepository.List() ?? []
}

async function Create(ctx: DefaultContext): Promise<void> {
  const { body } = ctx.request

  const user = new User(body)
  await UsersRepository.Create(user)

  ctx.status = http.CREATED
  ctx.body = user
}

async function Delete(ctx: DefaultContext): Promise<void> {
  const { id } = ctx.request.params
  await UsersRepository.Delete(id)

  ctx.status = http.GONE
  ctx.body = { message: "User deleted successfully" }
}

export default {
  List,
  Create,
  Delete,
}