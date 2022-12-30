"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordTokenService = void 0;
const database_1 = require("@/vendor/entities/database");
const helpers_1 = require("@/vendor/helpers");
const config_1 = require("@/app/config");
const exceptions_1 = require("@/vendor/exceptions");
async function findToken(token) {
    const passwordToken = await database_1.database.passwordToken.findUnique({
        where: { token },
        include: {
            user: true,
        },
    });
    if (!passwordToken) {
        throw (0, exceptions_1.NotFoundException)("password token not found", { token });
    }
    return passwordToken;
}
async function createToken(user) {
    const token = await helpers_1.Random.string(config_1.authConfig.tokens.length);
    if (user.password) {
        throw new Error("cannot create password token, user's password has already been set");
    }
    return database_1.database.passwordToken.create({
        data: {
            user_id: user.id,
            token,
        },
    });
}
async function deleteToken(token) {
    await database_1.database.passwordToken.delete({
        where: {
            id: token.id,
        },
    });
}
async function deleteUserTokens(user) {
    await database_1.database.passwordToken.deleteMany({
        where: {
            user_id: user.id,
        },
    });
}
exports.passwordTokenService = {
    findToken,
    createToken,
    deleteToken,
    deleteUserTokens,
};
