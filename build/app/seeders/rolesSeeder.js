"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolesSeeder = void 0;
const rolesSeeder = async (client) => {
    const roles = [
        { slug: "admin", name: "Admin" },
        { slug: "user", name: "User" },
    ];
    for (const role of roles) {
        await client.role.create({
            data: role,
        });
    }
};
exports.rolesSeeder = rolesSeeder;
