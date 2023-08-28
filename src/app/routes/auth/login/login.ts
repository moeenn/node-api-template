import { RouteOptions } from "fastify"
import { db } from "@/core/database"
import { AuthException, BadRequestException } from "@/core/exceptions"
import { Password, Auth } from "@/core/helpers"
import { bodySchema, Body } from "./login.schema"

export const login: RouteOptions = {
  url: "/login",
  method: "POST",
  config: {
    rateLimit: {
      max: 7,
      timeWindow: 1000 * 60 /* 1 minute */,
    },
  },
  schema: {
    body: bodySchema,
  },
  handler: async (req) => {
    const body = req.body as Body

    const user = await db.user.findFirst({
      where: {
        email: body.email,
      },
      include: {
        password: true,
      },
    })

    if (!user)
      throw AuthException("invalid email or password", {
        email: body.email,
        message: "login against non-existent user",
      })

    if (!user.password)
      throw BadRequestException("account not configured", {
        email: body.email,
        message: "failed login against non-configured account",
      })

    if (!user.approved)
      throw BadRequestException("user account disabled by admin", {
        email: body.email,
        message: "failed login against disabled account",
      })

    /** validate the actual password */
    const isValid = await Password.verify(user.password.hash, body.password)
    if (!isValid)
      throw AuthException("invalid email or password", {
        email: body.email,
        message: "invalid login password",
      })

    const token = await Auth.generateLoginAuthToken(user.id, user.role)

    return {
      user: Object.assign(user, { password: undefined }),
      auth: token,
    }
  },
}
