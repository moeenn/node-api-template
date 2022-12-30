"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = void 0;
const middleware_1 = require("@/vendor/middleware");
const user_1 = require("@/domain/user");
exports.getUserProfile = {
    url: "/user",
    method: "GET",
    preValidation: [middleware_1.validateToken],
    handler: async (req) => {
        const userID = req.requestContext.get("user_id");
        const user = await user_1.userController.getUser(userID);
        return {
            user,
        };
    },
};
