"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const SetFirstPasswordEmail_1 = require("./SetFirstPasswordEmail");
(0, vitest_1.describe)("SetFirstPasswordEmail test", () => {
    (0, vitest_1.it)("email template has all provided fields", () => {
        const args = {
            appName: "Sample app",
            frontendURL: "http://site.com/",
            resetPath: "path/to/setup",
            resetToken: "123123123",
        };
        const email = new SetFirstPasswordEmail_1.SetFirstPasswordEmail(args);
        const html = email.html();
        for (const [_, value] of Object.entries(args)) {
            (0, vitest_1.expect)(html.includes(value)).toBe(true);
        }
    });
});
