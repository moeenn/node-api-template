"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasRole = void 0;
const exceptions_1 = require("@/vendor/exceptions");
const hasRole = (...roles) => {
    return (req, _reply, done) => {
        const currentRoles = req.requestContext.get("user_roles");
        if (!isPresent(roles, currentRoles)) {
            throw (0, exceptions_1.AuthException)("only authorized roles can access this resource", {
                authorized_roles: roles,
            });
        }
        done();
    };
};
exports.hasRole = hasRole;
function isPresent(all, current) {
    for (const role of current) {
        if (all.includes(role)) {
            return true;
        }
    }
    return false;
}
