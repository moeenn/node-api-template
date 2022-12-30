"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegister = void 0;
const middleware_1 = require("@/vendor/middleware");
const user_1 = require("@/domain/user");
exports.userRegister = {
    url: "/users/register",
    method: "POST",
    preValidation: [middleware_1.validateToken, (0, middleware_1.hasRole)("admin")],
    schema: {
        body: user_1.RegisterUserSchema,
    },
    handler: async (req) => {
        const user = await user_1.userController.registerUser(req.body);
        return {
            message: "user registered successfully",
            user,
        };
    },
};
