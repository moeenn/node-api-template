"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const server_1 = require("@/vendor/entities/server");
async function main() {
    const server = new server_1.Server();
    await server.run();
}
main().catch(console.error);
