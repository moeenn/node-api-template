import { z } from "zod"
import { RouteOptions } from "@/Vendor/Entities/Server"
// import { AuthService } from "@/Domain/ModelServices"

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})
// type IBody = z.infer<typeof bodySchema>

/**
 *  login an admin (through DMS API) using email and password
 *
 */
export const Login: RouteOptions = {
  method: "POST",
  url: "/login",
  schema: {
    body: bodySchema,
  },
  handler: async (req) => {
    // const result = await AuthService.login(req.body as IBody)
    return {
      message: "you have reached login route",
      body_rec: req.body,
    }
  },
}
