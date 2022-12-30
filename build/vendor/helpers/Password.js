"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password = void 0;
const argon2_1 = __importDefault(require("argon2"));
const owasp_password_strength_test_1 = __importDefault(require("owasp-password-strength-test"));
exports.Password = {
    async hash(password) {
        return await argon2_1.default.hash(password);
    },
    async verify(hashed, cleartext) {
        return await argon2_1.default.verify(hashed, cleartext);
    },
    async checkStrength(cleartext) {
        return owasp_password_strength_test_1.default.test(cleartext);
    },
};
