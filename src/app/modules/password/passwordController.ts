import { Password, requestMeta } from "@/core/helpers"
import { validateToken } from "@/core/server/middleware"
import { RouteOptions } from "fastify"
import {
  UpdateUserPassword,
  UpdateUserPasswordSchema,
  SetFirstPassword,
  SetFirstPasswordSchema,
  CheckPasswordStrength,
  CheckPasswordStrengthSchema,
} from "./password.schema"
import { PasswordService } from "./passwordService"

const updateUserPassword: RouteOptions = {
  url: "/password/update",
  method: "POST",
  preValidation: [validateToken],
  schema: {
    body: UpdateUserPasswordSchema,
  },
  handler: async (req) => {
    const body = req.body as UpdateUserPassword
    const { userId } = requestMeta(req)

    await PasswordService.updateUserPassword(userId, body)
    return {
      message: "account password updated successfully",
    }
  },
}

const setFirstPassword: RouteOptions = {
  url: "/password/create",
  method: "POST",
  schema: {
    body: SetFirstPasswordSchema,
  },
  handler: async (req) => {
    const body = req.body as SetFirstPassword
    await PasswordService.setFirstPassword(body)
    return {
      message: "account configured successfully",
    }
  },
}

const checkPasswordStrength: RouteOptions = {
  url: "/password/check-strength",
  method: "POST",
  schema: {
    body: CheckPasswordStrengthSchema,
  },
  handler: async (req) => {
    const body = req.body as CheckPasswordStrength
    return Password.checkStrength(body.password)
  },
}

export const PasswordController = {
  updateUserPassword,
  setFirstPassword,
  checkPasswordStrength,
}
