"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestPasswordReset = void 0;
const forgetPassword_1 = require("@/domain/forgetPassword");
const exceptions_1 = require("@/vendor/exceptions");
exports.requestPasswordReset = {
    url: "/forget-password/request-reset",
    method: "POST",
    schema: {
        body: forgetPassword_1.RequestPasswordResetSchema,
    },
    handler: async (req) => {
        const userID = req.requestContext.get("user_id");
        if (userID) {
            throw (0, exceptions_1.BadRequestException)("please update the password using setting menu");
        }
        const res = {
            message: "password reset request will be processed",
        };
        try {
            await forgetPassword_1.forgetPasswordController.requestPasswordReset(req.body);
        }
        catch (_) {
            return res;
        }
        return res;
    },
};
