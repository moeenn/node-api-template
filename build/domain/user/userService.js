"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const database_1 = require("@/vendor/entities/database");
const exceptions_1 = require("@/vendor/exceptions");
const userRole_1 = require("@/domain/userRole");
const helpers_1 = require("@/vendor/helpers");
async function getUserByID(id) {
    const user = await database_1.database.user.findUnique({
        where: { id },
        include: {
            roles: {
                include: {
                    role: true,
                },
            },
        },
    });
    if (!user) {
        throw (0, exceptions_1.NotFoundException)(`user with id ${id} not found`);
    }
    return Object.assign(user, { password: undefined });
}
async function getUserByIDWithPassword(id) {
    const user = await database_1.database.user.findUnique({
        where: { id },
        include: {
            roles: {
                include: {
                    role: true,
                },
            },
        },
    });
    if (!user) {
        throw (0, exceptions_1.NotFoundException)(`user with id ${id} not found`);
    }
    return user;
}
async function getUserByEmail(email) {
    const user = await database_1.database.user.findFirst({
        where: { email },
        include: {
            roles: {
                include: {
                    role: true,
                },
            },
        },
    });
    if (!user) {
        throw (0, exceptions_1.NotFoundException)("user not found", { email });
    }
    return user;
}
async function createUser(args) {
    const exists = await database_1.database.user.findFirst({
        where: {
            email: args.email,
        },
    });
    if (exists) {
        throw (0, exceptions_1.BadRequestException)("user with email address already registered");
    }
    const user = await database_1.database.user.create({
        data: {
            name: args.name,
            email: args.email,
            roles: {
                create: args.roles.map((role) => ({
                    role_id: role.id,
                })),
            },
        },
        include: {
            roles: {
                include: {
                    role: true,
                },
            },
        },
    });
    return user;
}
async function setUserPassword(user, password) {
    const strengthTest = await helpers_1.Password.checkStrength(password);
    if (!strengthTest.strong) {
        throw (0, exceptions_1.BadRequestException)("please provide a stronger password", {
            errors: strengthTest.errors,
        });
    }
    const hash = await helpers_1.Password.hash(password);
    await database_1.database.user.update({
        where: {
            id: user.id,
        },
        data: {
            password: hash,
        },
    });
}
async function hasRole(user, slug) {
    for (const role of user.roles) {
        if (role.role.slug === slug) {
            return true;
        }
    }
    return false;
}
async function matchUserDomains(domain) {
    const users = await database_1.database.user.findMany({
        where: {
            email: {
                endsWith: domain,
            },
        },
    });
    return users.length;
}
async function approveDisaproveUser(user, status) {
    await database_1.database.user.update({
        where: {
            id: user.id,
        },
        data: {
            approved: status,
        },
    });
}
async function removeUser(user) {
    await userRole_1.userRoleService.removeUserRoles(user);
    await database_1.database.user.delete({
        where: {
            id: user.id,
        },
    });
}
exports.userService = {
    getUserByID,
    getUserByIDWithPassword,
    getUserByEmail,
    createUser,
    setUserPassword,
    hasRole,
    matchUserDomains,
    approveDisaproveUser,
    removeUser,
};
