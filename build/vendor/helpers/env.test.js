"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const env_1 = require("./env");
(0, vitest_1.describe)("env helper", () => {
    (0, vitest_1.it)("get env value which is already set", () => {
        const result = (0, env_1.env)("NODE_ENV");
        (0, vitest_1.expect)(result).toBe("test");
    });
    (0, vitest_1.it)("get env value which hasn't been set", () => {
        const call = () => (0, env_1.env)("SOME_RANDOM_SHITTY_VALUE");
        (0, vitest_1.expect)(call).toThrowError("not set");
    });
});
