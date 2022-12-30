"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const helpers_1 = require("@/vendor/helpers");
const _1 = require(".");
(0, vitest_1.test)("registerUser valid", async () => {
    const payload = {
        name: "random user",
        email: (await helpers_1.Random.string(5)) + "@site.com",
        roles: ["user"],
    };
    const user = await _1.userController.registerUser(payload);
    (0, vitest_1.expect)(user.id).toBeTruthy();
    (0, vitest_1.expect)(user.name).toBe(payload.name);
    (0, vitest_1.expect)(user.email).toBe(payload.email);
    (0, vitest_1.expect)(user.password).toBeFalsy();
    const fullUser = await _1.userService.getUserByEmail(user.email);
    await _1.userService.removeUser(fullUser);
});
