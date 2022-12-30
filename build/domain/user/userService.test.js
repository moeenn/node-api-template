"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const userService_1 = require("./userService");
const role_1 = require("@/domain/role");
const helpers_1 = require("@/vendor/helpers");
(0, vitest_1.test)("getUserByID", async () => {
    const roleUser = await role_1.roleService.getRoleBySlug("user");
    const newUser = await userService_1.userService.createUser({
        name: "someone",
        email: (await helpers_1.Random.string(5)) + "@site.com",
        roles: [roleUser],
    });
    (0, vitest_1.expect)(newUser.id).toBeTruthy();
    const foundUser = await userService_1.userService.getUserByID(newUser.id);
    (0, vitest_1.expect)(foundUser.id).toBe(newUser.id);
    await userService_1.userService.removeUser(newUser);
});
(0, vitest_1.test)("getUserByEmail", async () => {
    const roleUser = await role_1.roleService.getRoleBySlug("user");
    const email = (await helpers_1.Random.string(5)) + "@site.com";
    const newUser = await userService_1.userService.createUser({
        name: "someone",
        email: email,
        roles: [roleUser],
    });
    (0, vitest_1.expect)(newUser.id).toBeTruthy();
    const foundUser = await userService_1.userService.getUserByEmail(email);
    (0, vitest_1.expect)(foundUser.id).toBe(newUser.id);
    await userService_1.userService.removeUser(newUser);
});
(0, vitest_1.test)("setUserPassword", async () => {
    var _a;
    const roleUser = await role_1.roleService.getRoleBySlug("user");
    const email = (await helpers_1.Random.string(5)) + "@site.com";
    let newUser = await userService_1.userService.createUser({
        name: "someone",
        email: email,
        roles: [roleUser],
    });
    (0, vitest_1.expect)(newUser.id).toBeTruthy();
    (0, vitest_1.expect)(newUser.password).toBeFalsy();
    const newPassword = "123__Something_Random";
    await userService_1.userService.setUserPassword(newUser, newPassword);
    newUser = await userService_1.userService.getUserByEmail(newUser.email);
    (0, vitest_1.expect)(newUser.password).toBeTruthy();
    const isMatch = await helpers_1.Password.verify((_a = newUser.password) !== null && _a !== void 0 ? _a : "", newPassword);
    (0, vitest_1.expect)(isMatch).toBe(true);
    await userService_1.userService.removeUser(newUser);
});
(0, vitest_1.test)("hasRole", async () => {
    const roleUser = await role_1.roleService.getRoleBySlug("user");
    const email = (await helpers_1.Random.string(5)) + "@site.com";
    const newUser = await userService_1.userService.createUser({
        name: "someone",
        email: email,
        roles: [roleUser],
    });
    (0, vitest_1.expect)(newUser.id).toBeTruthy();
    const doesUserHaveRole = await userService_1.userService.hasRole(newUser, "user");
    (0, vitest_1.expect)(doesUserHaveRole).toBe(true);
    await userService_1.userService.removeUser(newUser);
});
(0, vitest_1.test)("approveDisaproveUser", async () => {
    const roleUser = await role_1.roleService.getRoleBySlug("user");
    let newUser = await userService_1.userService.createUser({
        name: "someone",
        email: (await helpers_1.Random.string(5)) + "@site.com",
        roles: [roleUser],
    });
    (0, vitest_1.expect)(newUser.id).toBeTruthy();
    (0, vitest_1.expect)(newUser.approved).toBe(true);
    await userService_1.userService.approveDisaproveUser(newUser, false);
    newUser = await userService_1.userService.getUserByEmail(newUser.email);
    (0, vitest_1.expect)(newUser.approved).toBe(false);
    await userService_1.userService.removeUser(newUser);
});
