"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authTokenService = void 0;
const database_1 = require("@/vendor/entities/database");
const helpers_1 = require("@/vendor/helpers");
const config_1 = require("@/app/config");
const exceptions_1 = require("@/vendor/exceptions");
async function createToken(user) {
    const token = await helpers_1.Random.string(config_1.authConfig.tokens.length);
    return database_1.database.authToken.create({
        data: {
            user_id: user.id,
            token,
        },
    });
}
async function validateToken(token) {
    const authToken = await database_1.database.authToken.findUnique({
        where: { token },
        include: {
            user: {
                include: {
                    roles: {
                        include: {
                            role: true,
                        },
                    },
                },
            },
        },
    });
    if (!authToken) {
        throw (0, exceptions_1.AuthException)("invalid auth bearer token");
    }
    return authToken;
}
async function revokeToken(token) {
    await database_1.database.authToken.delete({
        where: {
            id: token.id,
        },
    });
}
async function removeUserTokens(user) {
    await database_1.database.authToken.deleteMany({
        where: {
            user_id: user.id,
        },
    });
}
exports.authTokenService = {
    createToken,
    validateToken,
    revokeToken,
    removeUserTokens,
};
