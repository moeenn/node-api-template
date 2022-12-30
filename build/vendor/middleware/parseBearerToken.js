"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBearerToken = void 0;
const exceptions_1 = require("@/vendor/exceptions");
const parseBearerToken = async (req) => {
    const header = req.headers["authorization"];
    if (!header) {
        throw (0, exceptions_1.AuthException)("please provide bearer token");
    }
    const token = header.replace("Bearer ", "");
    if (!token) {
        throw (0, exceptions_1.AuthException)("invalid bearer token");
    }
    req.requestContext.set("token", token);
};
exports.parseBearerToken = parseBearerToken;
