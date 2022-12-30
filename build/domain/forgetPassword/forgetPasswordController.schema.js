"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetForgottenPasswordSchema = exports.ValidateTokenSchema = exports.RequestPasswordResetSchema = void 0;
const config_1 = require("@/app/config");
const zod_1 = require("zod");
exports.RequestPasswordResetSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
});
exports.ValidateTokenSchema = zod_1.z.object({
    token: zod_1.z.string(),
});
exports.ResetForgottenPasswordSchema = zod_1.z.object({
    token: zod_1.z.string(),
    password: zod_1.z.string().min(config_1.authConfig.password.minLength),
    confirm_password: zod_1.z.string().min(config_1.authConfig.password.minLength),
});
