"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const domain_1 = require("./domain");
(0, vitest_1.describe)("Domain name custom validator", () => {
    (0, vitest_1.it)("test valid domains", () => {
        const domains = ["site.com", "example.co.uk", "domain.gov"];
        for (const d of domains) {
            const result = domain_1.domain.handler(d);
            (0, vitest_1.expect)(result).toBe(true);
        }
    });
    (0, vitest_1.it)("test invalid domains", () => {
        const domains = ["site@com", "examplesite", "domain@domain.com"];
        for (const d of domains) {
            const result = domain_1.domain.handler(d);
            (0, vitest_1.expect)(result).toBe(false);
        }
    });
});
