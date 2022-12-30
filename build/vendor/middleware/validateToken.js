"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const helpers_1 = require("@/vendor/helpers");
const user_1 = require("@/domain/user");
const exceptions_1 = require("@/vendor/exceptions");
const validateToken = async (req) => {
    const token = parseBearerToken(req);
    if (!token) {
        throw (0, exceptions_1.AuthException)("invalid bearer token");
    }
    const jwtPayload = await helpers_1.JWT.validate((0, helpers_1.env)("JWT_SECRET"), token);
    if (!jwtPayload) {
        throw (0, exceptions_1.AuthException)("invalid bearer token");
    }
    const result = jwtPayload;
    if (!result.userID) {
        throw (0, exceptions_1.AuthException)("invalid bearer token");
    }
    const user = await user_1.userService.getUserByID(result.userID);
    const roleSlugs = user.roles.map((role) => role.role.slug);
    req.requestContext.set("token", token);
    req.requestContext.set("user_id", user.id);
    req.requestContext.set("user_roles", roleSlugs);
};
exports.validateToken = validateToken;
function parseBearerToken(req) {
    const header = req.headers["authorization"];
    if (!header)
        return;
    const token = header.replace("Bearer ", "");
    if (!token)
        return;
    return token;
}
