"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const JWT_1 = require("./JWT");
(0, vitest_1.test)("validate JWT", async () => {
    const secret = "some_random_secret";
    const payload = {
        id: 4000,
    };
    const token = await JWT_1.JWT.generate(secret, payload);
    (0, vitest_1.expect)(typeof token).toBe("string");
    const result = (await JWT_1.JWT.validate(secret, token));
    (0, vitest_1.expect)(result.id).toBe(payload.id);
});
