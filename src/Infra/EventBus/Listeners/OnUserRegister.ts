import EmailService, { UserRegisteredEmail } from "@/Infra/Email"

interface IPayload {
  email: string,
  password: string,
}

async function OnUserRegister(payload: IPayload) {
  await EmailService.sendEmail(
    payload.email, 
    new UserRegisteredEmail(payload.email, payload.password)
  )
}

export default OnUserRegister