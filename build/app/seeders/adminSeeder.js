"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminSeeder = void 0;
const role_1 = require("@/domain/role");
const helpers_1 = require("@/vendor/helpers");
const adminSeeder = async (client) => {
    const adminRole = await role_1.roleService.getRoleBySlug("admin");
    const admin = {
        name: "Admin",
        email: "admin@site.com",
        password: await helpers_1.Password.hash("123_Orangez"),
    };
    const user = await client.user.create({
        data: admin,
    });
    await client.userRole.create({
        data: {
            user_id: user.id,
            role_id: adminRole.id,
        },
    });
};
exports.adminSeeder = adminSeeder;
