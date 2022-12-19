import { Container } from "typedi"
import { RouteOptions } from "@/Vendor/Entities/Server"
import {
  ForgetPasswordController,
  ValidateTokenSchema,
  IValidateToken,
} from "@/Domain/ForgetPassword"

export const ValidatePasswordResetToken: RouteOptions = {
  url: "/forget-password/validate-token",
  method: "POST",
  schema: {
    body: ValidateTokenSchema,
  },
  handler: async (req) => {
    const forgetPasswordController = Container.get(ForgetPasswordController)
    const isValid = await forgetPasswordController.validateToken(
      req.body as IValidateToken,
    )

    return {
      is_valid: isValid,
    }
  },
}
