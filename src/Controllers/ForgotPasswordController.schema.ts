import joi from "joi"
import authConfig from "@/Core/Config/auth.json"

const requestReset = joi.object({
  email: joi.string().email().required(),
})

const resetPassword = joi.object({
  token: joi.string().required(),
  password: joi.string().min(authConfig.passwords.min_length).required(),
  confirm_password: joi.string().valid(joi.ref("password")).required(),
})

export default {
  requestReset,
  resetPassword,
}