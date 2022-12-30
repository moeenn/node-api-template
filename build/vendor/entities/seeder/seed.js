"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const seedRunner_1 = require("./seedRunner");
(0, seedRunner_1.seedRunner)().catch(console.error);
