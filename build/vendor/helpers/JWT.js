"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.JWT = {
    async generate(secret, payload, expiredInSeconds) {
        if (expiredInSeconds) {
            jsonwebtoken_1.default.sign(payload, secret, { expiresIn: expiredInSeconds });
        }
        return jsonwebtoken_1.default.sign(payload, secret);
    },
    async validate(secret, token) {
        try {
            return jsonwebtoken_1.default.verify(token, secret);
        }
        catch (err) {
            return;
        }
    },
};
