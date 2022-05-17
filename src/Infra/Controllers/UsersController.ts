import { DefaultContext } from "koa"
import User from "@src/Domain/Entities/User/User"
import UsersRepository from "@src/Infra/Repositories/UsersRepository"
import http from "http-status"

async function List(ctx: DefaultContext): Promise<void> {
  ctx.body = UsersRepository.List()
}

async function Create(ctx: DefaultContext): Promise<void> {
  const { body } = ctx.request

  const user = new User(body)
  const new_user = UsersRepository.Create(user)

  ctx.status = http.CREATED
  ctx.body = new_user
}

async function Delete(ctx: DefaultContext): Promise<void> {
  const { id } = ctx.request.params
  UsersRepository.Delete(id)

  ctx.status = http.GONE
  ctx.body = { message: "User deleted successfully" }
} 

export default {
  List,
  Create,
  Delete,
}