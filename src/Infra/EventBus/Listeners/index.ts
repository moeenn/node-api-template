import { IEventListener } from "@/Infra/EventBus/index.types"
import OnUserRegister from "./OnUserRegister"
import OnPasswordResetRequest from "./OnPasswordResetRequest"

const listeners: IEventListener[] =  [
  { key: "user-register",  handler: OnUserRegister },
  { key: "password-reset-request", handler: OnPasswordResetRequest },
]

export default listeners