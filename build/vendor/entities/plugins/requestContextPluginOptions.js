"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestContextPluginOptions = void 0;
const config_1 = require("@/app/config");
exports.requestContextPluginOptions = {
    hook: "preValidation",
    defaultStoreValues: config_1.authConfig.authStateDefaults,
};
