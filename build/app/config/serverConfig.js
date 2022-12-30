"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverConfig = void 0;
exports.serverConfig = {
    host: "0.0.0.0",
    port: 5000,
    apiPrefix: "/api/v1/",
    rateLimit: {
        max: 30,
        timeWindow: 60000,
    },
};
