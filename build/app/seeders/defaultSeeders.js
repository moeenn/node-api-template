"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultSeeders = void 0;
const rolesSeeder_1 = require("./rolesSeeder");
const adminSeeder_1 = require("./adminSeeder");
const usersSeeder_1 = require("./usersSeeder");
exports.defaultSeeders = [rolesSeeder_1.rolesSeeder, adminSeeder_1.adminSeeder, usersSeeder_1.usersSeeder];
