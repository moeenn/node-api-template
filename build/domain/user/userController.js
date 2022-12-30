"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const _1 = require(".");
const role_1 = require("@/domain/role");
const exceptions_1 = require("@/vendor/exceptions");
const config_1 = require("@/app/config");
const helpers_1 = require("@/vendor/helpers");
async function registerUser(args) {
    const roles = await role_1.roleService.getRolesBySlugs(args.roles);
    const user = await _1.userService.createUser({
        name: args.name,
        email: args.email,
        roles,
    });
    const token = await helpers_1.JWT.generate((0, helpers_1.env)("JWT_SECRET"), { userID: user.id }, config_1.authConfig.tokensExpiry.firstPassword);
    console.log({ token });
    return user;
}
async function getUser(id) {
    const user = await _1.userService.getUserByID(id);
    return user;
}
async function approveDisapproveUser(currentUserID, args) {
    const user = await _1.userService.getUserByID(args.user_id);
    if (user.id === currentUserID) {
        throw (0, exceptions_1.BadRequestException)("cannot disable own account");
    }
    await _1.userService.approveDisaproveUser(user, args.status);
}
async function removeUser(args) {
    const user = await _1.userService.getUserByIDWithPassword(args.user_id);
    await _1.userService.removeUser(user);
}
exports.userController = {
    registerUser,
    getUser,
    approveDisapproveUser,
    removeUser,
};
