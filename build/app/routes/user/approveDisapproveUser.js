"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveDisapproveUser = void 0;
const middleware_1 = require("@/vendor/middleware");
const user_1 = require("@/domain/user");
exports.approveDisapproveUser = {
    url: "/user/set-approval-status",
    method: "POST",
    preValidation: [middleware_1.validateToken, (0, middleware_1.hasRole)("admin")],
    schema: {
        body: user_1.ApproveDisapproveUserSchema,
    },
    handler: async (req) => {
        const currentUserID = req.requestContext.get("user_id");
        const body = req.body;
        await user_1.userController.approveDisapproveUser(currentUserID, body);
        return {
            message: "user account approval status updated successfully",
        };
    },
};
