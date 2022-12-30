"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const isJSON_1 = require("./isJSON");
(0, vitest_1.describe)("isJSON helper", () => {
    (0, vitest_1.it)("valid JSON is passed", () => {
        const json = '{"message":"random message"}';
        const result = (0, isJSON_1.isJSON)(json);
        (0, vitest_1.expect)(result).toBe(true);
    });
    (0, vitest_1.it)("invalid JSON is passed", () => {
        const notJSON = "[] some random string";
        const result = (0, isJSON_1.isJSON)(notJSON);
        (0, vitest_1.expect)(result).toBe(false);
    });
});
