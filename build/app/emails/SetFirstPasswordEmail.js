"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetFirstPasswordEmail = void 0;
const email_1 = require("@/vendor/entities/email");
class SetFirstPasswordEmail extends email_1.Email {
    constructor(args) {
        super("Account setup");
        this.args = args;
    }
    template() {
        return `
# Account setup
You account has been successfully created for ${this.args.appName}. Please click on the following link to setup your account. 

[Setup account](${this.args.frontendURL}${this.args.resetPath}?token=${this.args.resetToken})
`;
    }
}
exports.SetFirstPasswordEmail = SetFirstPasswordEmail;
