"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = void 0;
exports.authConfig = {
    password: {
        minLength: 10,
    },
    tokensExpiry: {
        auth: undefined,
        firstPassword: 60 * 60 * 72,
        passwordReset: 60 * 15,
    },
    authStateDefaults: {
        user_id: 0,
        user_roles: [],
        token: "",
    },
};
