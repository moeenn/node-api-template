"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.domain = exports.z = void 0;
var zod_1 = require("zod");
Object.defineProperty(exports, "z", { enumerable: true, get: function () { return zod_1.z; } });
exports.domain = {
    handler(value) {
        const pattern = /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/;
        return pattern.test(`${value}`);
    },
    options: {
        message: "invalid domain name",
    },
};
