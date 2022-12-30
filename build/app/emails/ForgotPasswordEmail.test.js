"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ForgotPasswordEmail_1 = require("./ForgotPasswordEmail");
(0, vitest_1.describe)("ForgotPasswordEmail test", () => {
    (0, vitest_1.it)("email html has all provided fields", () => {
        const args = {
            appName: "Sample App",
            resetLink: "http://site.com/reset",
        };
        const email = new ForgotPasswordEmail_1.ForgotPasswordEmail(args);
        const html = email.html();
        (0, vitest_1.expect)(html.includes(args.appName)).toBe(true);
        (0, vitest_1.expect)(html.includes(args.resetLink)).toBe(true);
    });
});
