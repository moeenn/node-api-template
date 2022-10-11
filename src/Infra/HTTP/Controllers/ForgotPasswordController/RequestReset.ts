import { RouteOptions } from "@/Infra/HTTP/Server"
import { z } from "@/Application/Helpers/Validator"
import { AuthService } from "@/Domain/ModelServices"
import { EmailServiceInstance, ForgotPasswordEmail } from "@/Infra/Email"
import { LoggerServiceInstance } from "@/Infra/Logger"

const bodySchema = z.object({
  email: z.string().email(),
})
type IBody = z.infer<typeof bodySchema>

export const RequestReset: RouteOptions = {
  url: "/forgot-password",
  method: "POST",
  schema: {
    body: bodySchema,
  },
  handler: async (req) => {
    const body = req.body as IBody

    let resetToken: string | undefined = undefined
    try {
      resetToken = await AuthService.requestPasswordReset(body.email)
    } catch (err) {
      if (err instanceof Error) {
        LoggerServiceInstance.info(err.message)
      }
    }

    if (resetToken) {
      EmailServiceInstance.sendEmail(
        body.email,
        new ForgotPasswordEmail(resetToken),
      )
    }
  },
}
