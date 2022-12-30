"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
function env(key) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`env variable not set: ${key}`);
    }
    return value.trim();
}
exports.env = env;
