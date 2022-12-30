"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectID = exports.z = void 0;
var zod_1 = require("zod");
Object.defineProperty(exports, "z", { enumerable: true, get: function () { return zod_1.z; } });
exports.objectID = {
    handler(value) {
        const pattern = /^[0-9a-fA-F]{24}$/;
        return pattern.test(`${value}`);
    },
    options: {
        message: "invalid mongodb object id",
    },
};
