import EmailService, { ForgotPasswordEmail } from "@/Infra/Email"

interface IPayload {
  email: string,
  resetToken: string,
}

async function OnPasswordResetRequest(payload: IPayload) {
  await EmailService.sendEmail(
    payload.email, 
    new ForgotPasswordEmail(payload.resetToken)
  )
}

export default OnPasswordResetRequest