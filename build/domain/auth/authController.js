"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const user_1 = require("@/domain/user");
const exceptions_1 = require("@/vendor/exceptions");
const config_1 = require("@/app/config");
const helpers_1 = require("@/vendor/helpers");
async function login(args, isAdmin) {
    const user = await user_1.userService.getUserByEmail(args.email);
    if (!user.password) {
        throw (0, exceptions_1.BadRequestException)("user account not configured");
    }
    const isCurrentUserAadmin = await user_1.userService.hasRole(user, "admin");
    if (isAdmin && !isCurrentUserAadmin) {
        throw (0, exceptions_1.AuthException)("only authorized roles can access this resource", {
            authorized_roles: ["admin"],
        });
    }
    if (!user.approved) {
        throw (0, exceptions_1.AuthException)("user account has been disabled by system administrators");
    }
    const isValid = await helpers_1.Password.verify(user.password, args.password);
    if (!isValid) {
        throw (0, exceptions_1.AuthException)("invalid email or password");
    }
    user.password = null;
    const jwtSecret = (0, helpers_1.env)("JWT_SECRET");
    const token = await helpers_1.JWT.generate(jwtSecret, { userID: user.id }, config_1.authConfig.tokensExpiry.auth);
    return { user, token };
}
async function setFirstPassword(args) {
    const jwtPayload = await helpers_1.JWT.validate((0, helpers_1.env)("JWT_SECRET"), args.password_token);
    const result = jwtPayload;
    if (!result.userID) {
        throw (0, exceptions_1.BadRequestException)("invalid password token");
    }
    const user = await user_1.userService.getUserByIDWithPassword(result.userID);
    await user_1.userService.setUserPassword(user, args.password);
}
exports.authController = {
    login,
    setFirstPassword,
};
