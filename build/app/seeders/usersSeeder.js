"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersSeeder = void 0;
const role_1 = require("@/domain/role");
const helpers_1 = require("@/vendor/helpers");
const usersSeeder = async (client) => {
    const userRole = await role_1.roleService.getRoleBySlug("user");
    const users = [
        {
            name: "User",
            email: "user@site.com",
            password: await helpers_1.Password.hash("123_Orangez"),
        },
    ];
    for (const user of users) {
        const userRecord = await client.user.create({
            data: user,
        });
        await client.userRole.create({
            data: {
                user_id: userRecord.id,
                role_id: userRole.id,
            },
        });
    }
};
exports.usersSeeder = usersSeeder;
