"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const Password_1 = require("./Password");
(0, vitest_1.describe)("Password helper", () => {
    (0, vitest_1.it)("valid password hashing and checking", async () => {
        const pwd = "random_password_300";
        const hash = await Password_1.Password.hash(pwd);
        const isValid = await Password_1.Password.verify(hash, pwd);
        (0, vitest_1.expect)(isValid).toBe(true);
    });
    (0, vitest_1.it)("invalid password hashing and checking", async () => {
        const pwd = "random_password";
        const hash = await Password_1.Password.hash(pwd);
        const isValid = await Password_1.Password.verify(hash, "ascascc");
        (0, vitest_1.expect)(isValid).toBe(false);
    });
    (0, vitest_1.it)("weak password strength test", async () => {
        const weak = await Password_1.Password.checkStrength("1231231");
        (0, vitest_1.expect)(weak.strong).toBe(false);
        (0, vitest_1.expect)(weak.errors.length).toBeTruthy();
    });
    (0, vitest_1.it)("strong password strength test", async () => {
        const weak = await Password_1.Password.checkStrength("!@#!@cas*CBCL32");
        (0, vitest_1.expect)(weak.strong).toBe(true);
        (0, vitest_1.expect)(weak.errors.length).toBeFalsy();
    });
});
