import { RouteOptions } from "@/vendor/entities/server"
import {
  forgetPasswordController,
  ValidateTokenSchema,
  IValidateToken,
} from "@/domain/forgetPassword"

export const validatePasswordResetToken: RouteOptions = {
  url: "/forget-password/validate-token",
  method: "POST",
  schema: {
    body: ValidateTokenSchema,
  },
  handler: async (req) => {
    const isValid = await forgetPasswordController.validateToken(
      req.body as IValidateToken,
    )

    return {
      is_valid: isValid,
    }
  },
}
