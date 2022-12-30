"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetFirstPasswordSchema = exports.LoginSchema = void 0;
const config_1 = require("@/app/config");
const zod_1 = require("zod");
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(10),
});
exports.SetFirstPasswordSchema = zod_1.z.object({
    password_token: zod_1.z.string(),
    password: zod_1.z.string().min(config_1.authConfig.password.minLength),
    confirm_password: zod_1.z.string().min(config_1.authConfig.password.minLength),
});
