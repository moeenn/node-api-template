"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRunner = void 0;
const database_1 = require("@/vendor/entities/database");
const defaultSeeders_1 = require("@/app/seeders/defaultSeeders");
async function seedRunner() {
    try {
        for (const seeder of defaultSeeders_1.defaultSeeders) {
            await seeder(database_1.database);
        }
    }
    finally {
        await database_1.database.$disconnect();
    }
}
exports.seedRunner = seedRunner;
