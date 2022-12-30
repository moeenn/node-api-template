"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = void 0;
const auth_1 = require("@/domain/auth");
exports.userLogin = {
    url: "/users/login",
    method: "POST",
    schema: {
        body: auth_1.LoginSchema,
    },
    config: {
        rateLimit: {
            max: 5,
            timeWindow: 1000 * 60,
        },
    },
    handler: async (req) => {
        const res = await auth_1.authController.login(req.body, false);
        return {
            message: "user logged-in successfully",
            ...res,
        };
    },
};
