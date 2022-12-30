"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUser = void 0;
const middleware_1 = require("@/vendor/middleware");
const user_1 = require("@/domain/user");
exports.removeUser = {
    url: "/users/remove",
    method: "POST",
    preValidation: [middleware_1.validateToken, (0, middleware_1.hasRole)("admin")],
    schema: {
        body: user_1.RemoveUserSchema,
    },
    handler: async (req) => {
        const body = req.body;
        await user_1.userController.removeUser(body);
        return {
            message: "user removed successfully",
        };
    },
};
