"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setFirstPassword = void 0;
const exceptions_1 = require("@/vendor/exceptions");
const auth_1 = require("@/domain/auth");
exports.setFirstPassword = {
    url: "/users/set-password",
    method: "POST",
    schema: {
        body: auth_1.SetFirstPasswordSchema,
    },
    handler: async (req) => {
        const body = req.body;
        if (body.password != body.confirm_password) {
            throw (0, exceptions_1.BadRequestException)("password confirmation failed");
        }
        await auth_1.authController.setFirstPassword(body);
        return {
            message: "password set successfully",
        };
    },
};
