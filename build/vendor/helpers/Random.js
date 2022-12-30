"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Random = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
exports.Random = {
    async string(bytes) {
        return node_crypto_1.default.randomBytes(bytes).toString("hex");
    },
    async int(min, max) {
        return node_crypto_1.default.randomInt(min, max);
    },
    async pin(length) {
        return [...Array(length)].map((_) => node_crypto_1.default.randomInt(0, 9)).join("");
    },
};
