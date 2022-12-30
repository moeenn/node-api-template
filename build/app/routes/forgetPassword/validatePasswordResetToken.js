"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePasswordResetToken = void 0;
const forgetPassword_1 = require("@/domain/forgetPassword");
exports.validatePasswordResetToken = {
    url: "/forget-password/validate-token",
    method: "POST",
    schema: {
        body: forgetPassword_1.ValidateTokenSchema,
    },
    handler: async (req) => {
        const isValid = await forgetPassword_1.forgetPasswordController.validateToken(req.body);
        return {
            is_valid: isValid,
        };
    },
};
