"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const exceptions_1 = require("@/vendor/exceptions");
function validate(data, schema) {
    const result = schema.safeParse(data);
    if (!result.success) {
        throw (0, exceptions_1.ValidationException)(result.error.message, result.error);
    }
    return result.data;
}
exports.validate = validate;
