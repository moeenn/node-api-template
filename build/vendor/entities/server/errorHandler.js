"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const helpers_1 = require("@/vendor/helpers");
async function errorHandler(error, _request, reply) {
    var _a;
    const err = (0, helpers_1.isJSON)(error.message) ? JSON.parse(error.message) : error.message;
    reply.status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500);
    return {
        code: error.code,
        error: err,
    };
}
exports.errorHandler = errorHandler;
