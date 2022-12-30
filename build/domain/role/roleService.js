"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleService = void 0;
const database_1 = require("@/vendor/entities/database");
const exceptions_1 = require("@/vendor/exceptions");
async function getRoleBySlug(slug) {
    const role = await database_1.database.role.findFirst({
        where: { slug },
    });
    if (!role) {
        throw (0, exceptions_1.NotFoundException)("user role not found", {
            role: slug,
        });
    }
    return role;
}
async function getRolesBySlugs(slugs) {
    const roles = [];
    for (const slug of slugs) {
        const role = await getRoleBySlug(slug);
        roles.push(role);
    }
    return roles;
}
exports.roleService = {
    getRoleBySlug,
    getRolesBySlugs,
};
