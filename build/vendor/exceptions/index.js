"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = exports.NotFoundException = exports.AuthException = exports.BadRequestException = void 0;
const error_1 = __importDefault(require("@fastify/error"));
function generateError(code, statusCode) {
    return (message, details) => {
        const json = JSON.stringify({ message, details });
        const ex = (0, error_1.default)(code, json, statusCode);
        return new ex();
    };
}
exports.BadRequestException = generateError("BAD_REQUEST", 400);
exports.AuthException = generateError("AUTH_ERROR", 401);
exports.NotFoundException = generateError("NOT_FOUND_ERROR", 404);
exports.ValidationException = generateError("VALIDATION_ERROR", 422);
