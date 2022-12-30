"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const Random_1 = require("./Random");
(0, vitest_1.describe)("Random helper", () => {
    (0, vitest_1.it)("random strings", async () => {
        const one = await Random_1.Random.string(10);
        const two = await Random_1.Random.string(10);
        (0, vitest_1.expect)(one === two).toBe(false);
    });
    (0, vitest_1.it)("random int", async () => {
        const min = 20;
        const max = 30;
        const result = await Random_1.Random.int(min, max);
        (0, vitest_1.expect)(result >= min && result <= max).toBe(true);
    });
    (0, vitest_1.it)("random pin", async () => {
        const pin = await Random_1.Random.pin(10);
        (0, vitest_1.expect)(pin.length).toBe(10);
    });
});
