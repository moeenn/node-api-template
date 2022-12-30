"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordResetTokenService = void 0;
const database_1 = require("@/vendor/entities/database");
const config_1 = require("@/app/config");
const helpers_1 = require("@/vendor/helpers");
async function findToken(token) {
    const passwordResetToken = await database_1.database.passwordResetToken.findUnique({
        where: { token },
        include: {
            user: true,
        },
    });
    if (!passwordResetToken)
        return;
    return passwordResetToken;
}
async function createToken(user) {
    const token = await helpers_1.Random.string(config_1.authConfig.tokens.length);
    return database_1.database.passwordResetToken.create({
        data: {
            user_id: user.id,
            token,
        },
    });
}
async function deleteToken(token) {
    await database_1.database.passwordResetToken.delete({
        where: {
            id: token.id,
        },
    });
}
async function deleteUserTokens(user) {
    await database_1.database.passwordResetToken.deleteMany({
        where: {
            user_id: user.id,
        },
    });
}
exports.passwordResetTokenService = {
    findToken,
    createToken,
    deleteToken,
    deleteUserTokens,
};
