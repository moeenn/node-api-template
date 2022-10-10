import { RouteOptions } from "@/Infra/HTTP/Server"

import { AuthConfig } from "@/Application/Config"
import { z } from "@/Application/Helpers/Validator"
import { AuthService } from "@/Domain/ModelServices"

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(AuthConfig.passwords.min_length),
})
type IBody = z.infer<typeof bodySchema>

export const Login: RouteOptions = {
  method: "POST",
  url: "/login",
  schema: {
    body: bodySchema,
  },
  handler: async (req) => {
    const result = await AuthService.login(req.body as IBody)
    return Object.assign({}, result.user.toObject(), {
      token: result.token,
      password: undefined,
    })
  },
}
