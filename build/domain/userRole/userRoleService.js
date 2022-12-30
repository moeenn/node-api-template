"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoleService = void 0;
const database_1 = require("@/vendor/entities/database");
async function removeUserRoles(user) {
    await database_1.database.userRole.deleteMany({
        where: {
            user_id: user.id,
        },
    });
}
exports.userRoleService = {
    removeUserRoles,
};
