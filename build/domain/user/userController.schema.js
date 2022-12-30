"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveUserSchema = exports.ApproveDisapproveUserSchema = exports.RegisterUserSchema = void 0;
const zod_1 = require("zod");
exports.RegisterUserSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    roles: zod_1.z.array(zod_1.z.string()),
});
exports.ApproveDisapproveUserSchema = zod_1.z.object({
    user_id: zod_1.z.number(),
    status: zod_1.z.boolean(),
});
exports.RemoveUserSchema = zod_1.z.object({
    user_id: zod_1.z.number(),
});
