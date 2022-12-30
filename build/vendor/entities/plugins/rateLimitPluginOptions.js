"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitPluginOptions = void 0;
const config_1 = require("@/app/config");
function rateLimitExceedHandler() {
    return (_req, context) => {
        return {
            code: 429,
            error: "too many requests",
            message: `exceeded limit of ${context.max} requests per ${context.after}`,
            date: Date.now(),
            expiresIn: context.ttl,
        };
    };
}
exports.rateLimitPluginOptions = {
    ...config_1.serverConfig.rateLimit,
    errorResponseBuilder: rateLimitExceedHandler(),
};
