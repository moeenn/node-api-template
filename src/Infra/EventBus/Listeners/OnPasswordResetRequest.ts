import { EmailServiceInstance, ForgotPasswordEmail } from "@/Infra/Email"

interface IPayload {
  email: string
  resetToken: string
}

export async function OnPasswordResetRequest(payload: IPayload) {
  await EmailServiceInstance.sendEmail(
    payload.email,
    new ForgotPasswordEmail(payload.resetToken),
  )
}
