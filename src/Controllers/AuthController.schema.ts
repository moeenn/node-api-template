import joi from "joi"
import authConfig from "@/Core/Config/auth.json"

const register = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(authConfig.passwords.min_length).required(),
  confirm_password: joi.string().valid(joi.ref("password")).required(),
})

const login = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(authConfig.passwords.min_length).required(),
})

export default {
  register,
  login,
}