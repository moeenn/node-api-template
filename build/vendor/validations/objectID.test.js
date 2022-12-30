"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const objectID_1 = require("./objectID");
(0, vitest_1.describe)("MongoDB ObjectID custom validator", () => {
    (0, vitest_1.it)("test valid object ids", () => {
        const ids = [
            "637b72bd72280461fefcad8b",
            "6385c96072280461fefcb554",
            "639c09af72280461fefcd354",
        ];
        for (const id of ids) {
            const result = objectID_1.objectID.handler(id);
            (0, vitest_1.expect)(result).toBe(true);
        }
    });
    (0, vitest_1.it)("test invalid object ids", () => {
        const ids = [
            "637b72bd72280461fefcad8b111111",
            "6385c96072280461fefc112x",
            "sample",
        ];
        for (const id of ids) {
            const result = objectID_1.objectID.handler(id);
            (0, vitest_1.expect)(result).toBe(false);
        }
    });
});
