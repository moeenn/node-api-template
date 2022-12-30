"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const auth_1 = require("@/domain/auth");
const middleware_1 = require("@/vendor/middleware");
exports.logout = {
    url: "/users/logout",
    method: "GET",
    preValidation: [middleware_1.parseBearerToken, middleware_1.validateToken],
    handler: async (req) => {
        const token = req.requestContext.get("token");
        await auth_1.authController.logout(token);
        return {
            message: "user logged-out successfully",
        };
    },
};
