import { DefaultContext } from "koa"
import { User } from "@src/Domain/Entities/User"
import { z } from "zod"
import UsersRepository from "@src/Infra/Database/Repositories/UserRepository"
import http from "http-status"
import Password from "@src/Application/Utilities/Password"
import Verify from "@src/Application/Utilities/Verify"

/**
 *  register a new user
 * 
*/
async function Register(ctx: DefaultContext): Promise<void> {
  const { body } = ctx.request

  const user = User.NewUser(body)
  await UsersRepository.Create(user)

  ctx.status = http.CREATED
  ctx.body = { id: user.id, name: user.name, email: user.email } 
}

/**
 *  login existing user
 * 
*/
async function Login(ctx: DefaultContext): Promise<void> {
  const { body } = ctx.request
  const errors = Verify(body, z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }))

  if (errors) {
    ctx.status = http.UNPROCESSABLE_ENTITY
    ctx.body = errors
    return
  }

  const user = await UsersRepository.FindByEmail(body.email)
  if (!user) {
    ctx.status = http.UNAUTHORIZED
    return
  }

  const isPasswordValid = Password.Verify(user.password, body.password)
  if (!isPasswordValid) {
    ctx.status = http.UNAUTHORIZED
    return
  }

  // TODO: implement JWT
  ctx.body = { message: "User logged-in successfully" }
}

/**
 *  logout a logged-in user
 * 
*/
async function Logout(ctx: DefaultContext): Promise<void> {
  // TODO: implement
}

export default {
  Register,
  Login,
  Logout,
}
