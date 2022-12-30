"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetForgottenPassword = void 0;
const exceptions_1 = require("@/vendor/exceptions");
const forgetPassword_1 = require("@/domain/forgetPassword");
exports.resetForgottenPassword = {
    url: "/forget-password/reset",
    method: "POST",
    schema: {
        body: forgetPassword_1.ResetForgottenPasswordSchema,
    },
    handler: async (req) => {
        const body = req.body;
        if (body.password !== body.confirm_password) {
            throw (0, exceptions_1.BadRequestException)("password confirmation failed");
        }
        await forgetPassword_1.forgetPasswordController.resetForgottenPassword(body);
        return {
            message: "password has been updated successfully",
        };
    },
};
