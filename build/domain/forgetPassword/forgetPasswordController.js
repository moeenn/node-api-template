"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgetPasswordController = void 0;
const user_1 = require("@/domain/user");
const config_1 = require("@/app/config");
const helpers_1 = require("@/vendor/helpers");
const exceptions_1 = require("@/vendor/exceptions");
async function requestPasswordReset(args) {
    const user = await user_1.userService.getUserByEmail(args.email);
    const token = await helpers_1.JWT.generate((0, helpers_1.env)("JWT_SECRET"), { userID: user.id }, config_1.authConfig.tokensExpiry.passwordReset);
    return token;
}
async function validateToken(args) {
    const result = await helpers_1.JWT.validate((0, helpers_1.env)("JWT_SECRET"), args.token);
    return !result ? false : true;
}
async function resetForgottenPassword(args) {
    const result = await helpers_1.JWT.validate((0, helpers_1.env)("JWT_SECRET"), args.token);
    if (!result) {
        throw (0, exceptions_1.BadRequestException)("invalid password reset token");
    }
    const res = result;
    if (!res.userID) {
        throw (0, exceptions_1.BadRequestException)("invalid password reset token");
    }
    const user = await user_1.userService.getUserByIDWithPassword(res.userID);
    await user_1.userService.setUserPassword(user, args.password);
}
exports.forgetPasswordController = {
    requestPasswordReset,
    validateToken,
    resetForgottenPassword,
};
