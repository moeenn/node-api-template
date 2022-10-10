import { EmailServiceInstance, UserRegisteredEmail } from "@/Infra/Email"

interface IPayload {
  email: string
  password: string
}

export async function OnUserRegister(payload: IPayload) {
  await EmailServiceInstance.sendEmail(
    payload.email,
    new UserRegisteredEmail(payload.email, payload.password),
  )
}
